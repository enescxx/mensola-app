import { client } from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
}));

jest.mock("expo-router", () => ({
    router: {
        replace: jest.fn()
    }
}));

describe("HttpClient Infrastructure Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    it("should append the Authorization header and return data on a successful authorized GET request", async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
            "mock-access-token"
        );

        const mockApiResponse = {
            success: true,
            data: { fullname: "John Doe" }
        };

        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            headers: {
                get: (headerName: string) =>
                    headerName === "content-type" ? "application/json" : null
            },
            json: async () => mockApiResponse
        });

        const result = await client.get("/user", { auth: true });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("/user"),
            expect.objectContaining({
                method: "GET",
                headers: expect.objectContaining({
                    Authorization: "Bearer mock-access-token"
                })
            })
        );

        expect(result).toEqual(mockApiResponse);
    });

    it("should automatically refresh the token upon a 401 error and retry the original request with the new token", async () => {
        (AsyncStorage.getItem as jest.Mock).mockImplementation(key => {
            if (key === "token") return Promise.resolve("old-token");
            if (key === "refreshToken") return Promise.resolve("refresh-token");
            return Promise.resolve(null);
        });

        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: false,
                status: 401,
                headers: {
                    get: h => (h === "content-type" ? "application/json" : null)
                },
                json: async () => ({ success: false, message: "Unauthorized" })
            })

            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: {
                    get: h => (h === "content-type" ? "application/json" : null)
                },
                json: async () => ({
                    success: true,
                    data: { accessToken: "new-token" }
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: {
                    get: h => (h === "content-type" ? "application/json" : null)
                },
                json: async () => ({ success: true, data: "profile" })
            });

        const result = await client.get("/profile", { auth: true });

        expect(AsyncStorage.setItem).toHaveBeenCalledWith("token", "new-token");

        expect(global.fetch).toHaveBeenLastCalledWith(
            expect.stringContaining("/profile"),
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: "Bearer new-token"
                })
            })
        );

        expect(result).toEqual({ success: true, data: "profile" });
    });

    it("should clear tokens and redirect to /login if the refresh token request fails", async () => {
        const { router } = require("expo-router");

        (AsyncStorage.getItem as jest.Mock).mockResolvedValue("any-token");

        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: false,
                status: 401,
                headers: {
                    get: h => (h === "content-type" ? "application/json" : null)
                },
                json: async () => ({ success: false })
            })
            .mockResolvedValueOnce({
                ok: false,
                status: 400,
                headers: {
                    get: h => (h === "content-type" ? "application/json" : null)
                },
                json: async () => ({ success: false })
            });

        await expect(client.get("/profile", { auth: true })).rejects.toEqual(
            expect.objectContaining({ success: false })
        );

        expect(AsyncStorage.removeItem).toHaveBeenCalledWith("token");
        expect(AsyncStorage.removeItem).toHaveBeenCalledWith("refreshToken");

        expect(router.replace).toHaveBeenCalledWith("/login");
    });

    it("should queue subsequent requests while a refresh token request is in progress and resolve them after completion", async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValue("old-token");

        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: false,
                status: 401,
                headers: { get: h => "application/json" },
                json: async () => ({ success: false })
            })
            .mockResolvedValueOnce({
                ok: false,
                status: 401,
                headers: { get: h => "application/json" },
                json: async () => ({ success: false })
            })
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: { get: h => "application/json" },
                json: async () => ({
                    success: true,
                    data: { accessToken: "yeni-token" }
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: { get: h => "application/json" },
                json: async () => ({ success: true, data: "request-2-data" })
            })
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: { get: h => "application/json" },
                json: async () => ({ success: true, data: "request-1-data" })
            });

        const [res1, res2] = await Promise.all([
            client.get("/endpoint1", { auth: true }),
            client.get("/endpoint2", { auth: true })
        ]);

        const refreshCalls = (global.fetch as jest.Mock).mock.calls.filter(
            call => call[0].includes("/auth/refresh")
        );
        expect(refreshCalls.length).toBe(1);

        expect(res1).toEqual({ success: true, data: "request-1-data" });
        expect(res2).toEqual({ success: true, data: "request-2-data" });
    });
});
