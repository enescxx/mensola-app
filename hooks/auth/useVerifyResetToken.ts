import { useState } from "react";
import { useRouter ,useLocalSearchParams} from "expo-router";


import { AuthService } from "../../services/auth.service";


const useVerifyResetToken = () => {
    const router = useRouter();

    const { email } = useLocalSearchParams<{ email: string }>();

    const [code, setCode] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleVerifyToken = async () => {
        if (!code || code.length < 6) {
            setError("Lütfen geçerli bir doğrulama kodu giriniz.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await AuthService.verifyResetToken({
                email,
                code
            });

            const ticket = response.data.ticket;

            router.replace({
                pathname: "/(auth)/reset-password",
                params: { ticket }
            });
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
        code,
        setCode,
        isLoading,
        error,
        handleVerifyToken
    };
};

export { useVerifyResetToken };
