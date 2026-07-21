import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

import { AuthService } from "../../services/auth.service";

const useResetPassword = () => {
    const router = useRouter();

    const { ticket } = useLocalSearchParams<{ ticket: string }>();

    const [newPassword, setNewPassword] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleResetPassword = async () => {
        if (newPassword.length < 6) {
            setError("Yeni şifreniz en az 6 karakter olmalıdır.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await AuthService.resetPassword({
                newPassword,
                ticket
            });

            router.replace("/(auth)/login");
        } catch (error) {
            if (error && error.success === false) {
                const apiErrorMessage = error.error?.message || error?.message;
                setError(
                    apiErrorMessage ||
                        "Doğrulama yapılırken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz."
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
        newPassword,
        setNewPassword,
        isLoading,
        error,
        handleResetPassword
    };
};

export { useResetPassword };
