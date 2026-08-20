import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useGlobalUser } from "@/context/AuthContext";
import { AuthService } from "@/services/auth.service";
import { isApiError } from "@/utils/api.utils";

const useLogin = () => {
    const { setUser } = useGlobalUser();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Lütfen tüm alanları doldurun.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Lütfen geçerli bir e-posta adresi giriniz.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await AuthService.login({ email, password });

            if (!response.data?.accessToken || !response.data?.refreshToken || !response.data?.user) {
                throw new Error("Giriş yapılırken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz.");
            }

            const { user, accessToken, refreshToken } = response.data;

            setUser(user);

            await AsyncStorage.multiSet([
                ["token", accessToken],
                ["refreshToken", refreshToken],
            ]);

            router.replace("/(tabs)/home");
        } catch (error) {
            console.log(error);
            if (isApiError(error)) {
                const apiErrorMessage = error.error?.message || error?.message;
                setError(apiErrorMessage || "Giriş yapılırken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz.");
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { email, setEmail, password, setPassword, isLoading, error, handleLogin };
};

export { useLogin };
