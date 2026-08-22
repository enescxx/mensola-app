import { useState, useEffect, useCallback } from "react";

import { ProfileService } from "../../services/profile.service";
import { UserProfile } from "@/types/user.types";
import { UserId } from "@/types/common.types";
import { isApiError } from "@/utils/api.utils";

const useProfile = (userId: UserId | "me") => {
    const [profile, setProfile] = useState<UserProfile>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await ProfileService.getProfile({ userId });

            if (!response.data?.profile) throw new Error("Bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz.");
            setProfile(response.data.profile);
        } catch (error) {
            if (isApiError(error)) {
                const apiErrorMessage = error.error?.message || error?.message;
                setError(
                    apiErrorMessage || "Profil bilgileri çekilirken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz.",
                );
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, isLoading, error };
};

export { useProfile };
