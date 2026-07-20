import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useGlobalUser } from "../../context/AuthContext";
import { AuthService } from "../../services/auth.service";

import { Alert } from "react-native";

const useRegister = () => {
    const { setUser } = useGlobalUser();
    const router = useRouter();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
            setError("Lütfen tüm alanları doldurun.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Lütfen geçerli bir e-posta adresi giriniz.");
            return;
        }

        if (password.length < 6) {
            setError("Şifreniz en az 6 karakter olmalıdır.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Şifreler birbiriyle eşleşmiyor.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await AuthService.register({
                username,
                email,
                password
            });

            const user = response.data.user;
            setUser(user);

            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            await AsyncStorage.setItem("token", accessToken);
            await AsyncStorage.setItem("refreshToken", refreshToken);

            router.replace("/(tabs)/home");
        } catch (error) {
            if (error && error.success === false) {
                const apiErrorMessage = error.error?.message || error?.message;
                setError(
                    apiErrorMessage ||
                        "Kayıt yapılırken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz."
                );
            } else {
                setError(
                    "Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        error,
        handleRegister
    };
};

export { useRegister };
