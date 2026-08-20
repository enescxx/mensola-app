import { useState } from "react";

import { UserService } from "@/services/user.service";
import { UserId } from "@/types/common.types";
import { isApiError } from "@/utils/api.utils";

const useFollow = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const followHandler = async (targetId: UserId, onSuccess?: () => void) => {
        setIsLoading(true);
        setError("");
        try {
            await UserService.follow(targetId);
            onSuccess?.();
        } catch (error) {
            if (isApiError(error)) {
                const apiErrorMessage = error.error?.message || error?.message;
                setError(apiErrorMessage || "Takip işlemi başarısız oldu. Lütfen tekrar deneyiniz");
            } else {
                setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const unfollowHandler = async (targetId: UserId, onSuccess?: () => void) => {
        setIsLoading(true);
        setError("");
        try {
            await UserService.unfollow(targetId);
            onSuccess?.();
        } catch (error) {
            if (isApiError(error)) {
                const apiErrorMessage = error.error?.message || error?.message;
                setError(apiErrorMessage || "Takipten çıkma işlemi başarısız oldu. Lütfen tekrar deneyiniz.");
            } else {
                setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { followHandler, unfollowHandler, isLoading, error };
};

export { useFollow };
