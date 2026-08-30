import { useState } from "react";
import { MovieService } from "@/services/movie.service";
import { MovieId } from "@/types/common.types";

export const useFavoriteMovies = (defaultMovieId?: MovieId) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const addFavorite = async (
        payload?: MovieId | { movieId?: MovieId; tmdbId?: number; replaceMovieId?: MovieId } | (() => void),
        onSuccess?: () => void
    ) => {
        let params: { movieId?: MovieId; tmdbId?: number; replaceMovieId?: MovieId } = {};
        let callback = onSuccess;

        if (typeof payload === "function") {
            callback = payload;
            if (defaultMovieId) {
                params.movieId = defaultMovieId;
            }
        } else if (typeof payload === "string") {
            params.movieId = payload;
        } else if (typeof payload === "object" && payload !== null) {
            params = payload;
        } else {
            if (defaultMovieId) {
                params.movieId = defaultMovieId;
            }
        }

        if (!params.movieId && !params.tmdbId) return;

        setIsLoading(true);
        setError("");

        try {
            const response = await MovieService.addToFavorites(params);
            callback?.();
            return response;
        } catch (err: any) {
            if (err && err.success === false) {
                const apiErrorMessage = err.error?.message || err?.message;
                setError(apiErrorMessage || "Film favorilere eklenirken bir hata oluştu.");
            } else {
                setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const removeFavorite = async (targetMovieId?: MovieId | (() => void), onSuccess?: () => void) => {
        let id = defaultMovieId;
        let callback = onSuccess;

        if (typeof targetMovieId === "function") {
            callback = targetMovieId;
        } else if (typeof targetMovieId === "string") {
            id = targetMovieId;
        }

        if (!id) return;

        setIsLoading(true);
        setError("");

        try {
            const response = await MovieService.removeFromFavorites(id);
            callback?.();
            return response;
        } catch (err: any) {
            if (err && err.success === false) {
                const apiErrorMessage = err.error?.message || err?.message;
                setError(apiErrorMessage || "Film favorilerden çıkarılırken bir hata oluştu.");
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
