import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface RequestOptions extends RequestInit {
    auth?: boolean;
}

interface RefreshQueueItem {
    resolve: (value: any) => void;
    reject: (error: any) => void;
    url: string;
    config: RequestInit;
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

let isRefreshing = false;
let failedQueue: RefreshQueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(item => {
        if (error) {
            item.reject(error);
        } else if (token) {
            const updatedConfig = {
                ...item.config,
                headers: {
                    ...item.config.headers,
                    Authorization: `Bearer ${token}`
                }
            };
            fetch(`${BASE_URL}${item.url}`, updatedConfig)
                .then(res =>
                    res.headers
                        .get("content-type")
                        ?.includes("application/json")
                        ? res.json()
                        : res
                )
                .then(data => item.resolve(data))
                .catch(err => item.reject(err));
        }
    });
    failedQueue = [];
};

async function httpClient<T = any>(
    url: string,
    options: RequestOptions = {}
): Promise<T> {
    const config: RequestInit = {
        method: options.method || "GET",
        headers: { ...(options.headers as Record<string, string>) }
    };

    if (options.body) {
        if (options.body instanceof FormData) {
            config.body = options.body;
        } else {
            (config.headers as Record<string, string>)["Content-Type"] =
                "application/json";
            config.body = JSON.stringify(options.body);
        }
    }

    if (options.auth) {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            (config.headers as Record<string, string>)["Authorization"] =
                `Bearer ${token}`;
        }
    }

    try {
        const response = await fetch(`${BASE_URL}${url}`, config);
        const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
        const responseData = isJson ? await response.json() : null;

        if (
            options.auth &&
            (response.status === 401 || response.status === 403)
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, url, config });
                });
            }

            isRefreshing = true;

            try {
                const storedRefreshToken =
                    await AsyncStorage.getItem("refreshToken");

                const refreshResponse = await fetch(
                    `${BASE_URL}/auth/refresh`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            refreshToken: storedRefreshToken
                        })
                    }
                );

                const refreshData = await refreshResponse.json();

                if (refreshResponse.ok && refreshData.success) {
                    const newToken = refreshData.data.accessToken;
                    await AsyncStorage.setItem("token", newToken);

                    isRefreshing = false;
                    processQueue(null, newToken);

                    (config.headers as Record<string, string>)[
                        "Authorization"
                    ] = `Bearer ${newToken}`;
                    const retryResponse = await fetch(
                        `${BASE_URL}${url}`,
                        config
                    );
                    return isJson ? await retryResponse.json() : null;
                }
            } catch (refreshError) {
                processQueue(refreshError, null);
            }

            isRefreshing = false;
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("refreshToken");

            router.replace("/login");

            throw (
                responseData || {
                    success: false,
                    error: { message: "Oturum süresi doldu." }
                }
            );
        }

        if (!response.ok || (responseData && responseData.success === false)) {
            throw (
                responseData || {
                    success: false,
                    error: { message: "Bir hata meydana geldi." }
                }
            );
        }

        return responseData;
    } catch (error) {
        throw error;
    }
}

export const client = {
    get: <T = any>(
        url: string,
        options?: Omit<RequestOptions, "method" | "body">
    ) => httpClient<T>(url, { ...options, method: "GET" }),
    post: <T = any>(
        url: string,
        body?: any,
        options?: Omit<RequestOptions, "method" | "body">
    ) => httpClient<T>(url, { ...options, method: "POST", body }),
    put: <T = any>(
        url: string,
        body?: any,
        options?: Omit<RequestOptions, "method" | "body">
    ) => httpClient<T>(url, { ...options, method: "PUT", body }),
    delete: <T = any>(
        url: string,
        options?: Omit<RequestOptions, "method" | "body">
    ) => httpClient<T>(url, { ...options, method: "DELETE" })
};
