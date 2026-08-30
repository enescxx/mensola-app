import { useState } from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { UserService } from "@/services/user.service";

export function useChangePassword({ onSuccess }: { onSuccess?: () => void }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Requirements Validation
    const isMinLength = newPassword.length >= 8;
    const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const isNotSameAsCurrent = newPassword.length > 0 && newPassword !== currentPassword;

    const areRequirementsMet = isMinLength && hasNumberOrSpecial && isNotSameAsCurrent;
    const doPasswordsMatch = newPassword === confirmPassword;

    const canSubmit =
        currentPassword.length > 0 &&
        newPassword.length > 0 &&
        confirmPassword.length > 0 &&
        areRequirementsMet &&
        doPasswordsMatch &&
        !isLoading;

    const handleUpdatePassword = async () => {
        if (!canSubmit) return;
        setIsLoading(true);
        setErrorMessage(null);
        try {
            const res = await UserService.changePassword(currentPassword, newPassword);
            const { accessToken, refreshToken } = res.data;

            // Save new tokens
            await SecureStore.setItemAsync("token", accessToken);
            if (refreshToken) {
                await SecureStore.setItemAsync("refreshToken", refreshToken);
            }

            onSuccess?.();
            router.back();
        } catch (err: any) {
            const message =
                err?.message ||
                err?.error?.message ||
                "Şifre güncellenemedi. Mevcut şifrenizi kontrol edin.";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        errorMessage,
        isMinLength,
        hasNumberOrSpecial,
        isNotSameAsCurrent,
        canSubmit,
        doPasswordsMatch,
        handleUpdatePassword,
    };
}
