import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useGlobalUser } from "../../context/AuthContext";
import { AuthService } from "../../services/auth.service";

import { Alert } from "react-native";

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

        setIsLoading(true);
        setError("");
        try {
            const response = await AuthService.login({ email, password });

            if (!response.success) {
                const apiErrorMessage = response.error?.message;
                setError(
                    apiErrorMessage
                        ? apiErrorMessage
                        : "Giriş yaparken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz."
                );
                return;
            }

            const user = response.data.user;
            setUser(user);

            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            await AsyncStorage.setItem("token", accessToken);
            await AsyncStorage.setItem("refreshToken", refreshToken);

            router.replace("/(tabs)/home");
        } catch (error) {
            setError(
                "Giriş yaparken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        error,
        handleLogin
    };
};

export { useLogin };
