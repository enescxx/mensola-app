import { useState } from "react";
import { router } from "expo-router";

import { UserService } from "@/services/user.service";
import { useGlobalUser } from "@/context/AuthContext";

export function useChangeEmail({ onSuccess }: { onSuccess?: (newEmail: string) => void }) {
    const { user, setUser } = useGlobalUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState<1 | 2>(1);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleRequestCode = async () => {
        if (!email.trim() || !password || isLoading) return;
        setIsLoading(true);
        setErrorMessage(null);
        try {
            await UserService.requestEmailChange(email.trim(), password);
            setStep(2);
        } catch (err: any) {
            const message =
                err?.message ||
                err?.error?.message ||
                "Doğrulama kodu gönderilemedi. Şifrenizi ve e-postanızı kontrol edin.";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (code.length !== 6 || isLoading) return;
        setIsLoading(true);
        setErrorMessage(null);
        try {
            const res = await UserService.verifyEmailChange(email.trim(), code);
            const newEmail = res.data?.user?.email;
            if (user && newEmail) {
                setUser({ ...user, email: newEmail });
            }
            if (newEmail) onSuccess?.(newEmail);
            router.back();
        } catch (err: any) {
            const message =
                err?.message ||
                err?.error?.message ||
                "Doğrulama kodu geçersiz veya süresi dolmuş.";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    const canSubmit = step === 1
        ? (email.trim().length > 0 && password.length >= 6 && !isLoading)
        : (code.length === 6 && !isLoading);

    return {
        email,
        setEmail,
        password,
        setPassword,
        code,
        setCode,
        step,
        isLoading,
        errorMessage,
        canSubmit,
        handleRequestCode,
        handleVerifyCode,
    };
}
