import { useState, useEffect, useCallback } from "react";

import { ProfileService } from "../../services/profile.service";
import { GetProfileResponse, StatTypes } from "../../types";

const useProfile = (targetProfileId?: string) => {
    const [profile, setProfile] = useState<GetProfileResponse>({});

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchProfile = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response =
                targetProfileId === "me"
                    ? await ProfileService.getMe()
                    : await ProfileService.getProfile(targetProfileId);

            const {
                id,
                username,
                fullname,
                bio,
                avatar,
                favoriteMovies,
                favoriteTracks,
                ...rawStats
            } = response.data.profile as GetProfileResponse;

            const stats = Object.keys(rawStats).map(key => ({
                type: key as StatTypes,
                value: rawStats[key]
            }));

            setProfile({
                id,
                username,
                fullname,
                bio,
                avatar,
                favoriteMovies,
                favoriteTracks,
                stats
            });
        } catch (error) {
            if (error && error.success === false) {
                const apiErrorMessage = error.error?.message || error?.message;
                setError(
                    apiErrorMessage ||
                        "Profil bilgileri çekilirken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz."
                );
            } else {
                setError(
                    "Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz."
                );
            }
        } finally {
            setIsLoading(false);
        }
    }, [targetProfileId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return {
        profile,
        isLoading,
        error
    };
};

export { useProfile };
