import { useState } from "react";
import { TrackService } from "@/services/track.service";
import { TrackId } from "@/types/common.types";

export const useFavoriteTracks = (defaultTrackId?: TrackId) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const addFavorite = async (
        payload?: TrackId | { trackId?: TrackId; spotifyId?: string; replaceTrackId?: TrackId } | (() => void),
        onSuccess?: () => void
    ) => {
        let params: { trackId?: TrackId; spotifyId?: string; replaceTrackId?: TrackId } = {};
        let callback = onSuccess;

        if (typeof payload === "function") {
            callback = payload;
            if (defaultTrackId) {
                params.trackId = defaultTrackId;
            }
        } else if (typeof payload === "string") {
            params.trackId = payload;
        } else if (typeof payload === "object" && payload !== null) {
            params = payload;
        } else {
            if (defaultTrackId) {
                params.trackId = defaultTrackId;
            }
        }

        if (!params.trackId && !params.spotifyId) return;

        setIsLoading(true);
        setError("");

        try {
            const response = await TrackService.addToFavorites(params);
            callback?.();
            return response;
        } catch (err: any) {
            if (err && err.success === false) {
                const apiErrorMessage = err.error?.message || err?.message;
                setError(apiErrorMessage || "Şarkı favorilere eklenirken bir hata oluştu.");
            } else {
                setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const removeFavorite = async (targetTrackId?: TrackId | (() => void), onSuccess?: () => void) => {
        let id = defaultTrackId;
        let callback = onSuccess;

        if (typeof targetTrackId === "function") {
            callback = targetTrackId;
        } else if (typeof targetTrackId === "string") {
            id = targetTrackId;
        }

        if (!id) return;

        setIsLoading(true);
        setError("");

        try {
            const response = await TrackService.removeFromFavorites(id);
            callback?.();
            return response;
        } catch (err: any) {
            if (err && err.success === false) {
                const apiErrorMessage = err.error?.message || err?.message;
                setError(apiErrorMessage || "Şarkı favorilerden çıkarılırken bir hata oluştu.");
            } else {
                setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { addFavorite, removeFavorite, isLoading, error };
};
