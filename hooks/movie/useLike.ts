import { useState } from "react";

import { MovieService } from "@/services/movie.service";

const useLike = (defaultMovieId?: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const likeMovie = async (targetMovieId?: string | (() => void), onSuccess?: () => void) => {
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
            const response = await MovieService.likeMovie(id);
            callback?.();
            return response;
        } catch (err: any) {
            if (err && err.success === false) {
                const apiErrorMessage = err.error?.message || err?.message;
                setError(apiErrorMessage || "Film beğenilirken bir hata oluştu.");
            } else {
                setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const unlikeMovie = async (targetMovieId?: string | (() => void), onSuccess?: () => void) => {
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
            const response = await MovieService.unlikeMovie(id);
            callback?.();
            return response;
        } catch (err: any) {
            if (err && err.success === false) {
                const apiErrorMessage = err.error?.message || err?.message;
                setError(apiErrorMessage || "Film beğenisi kaldırılırken bir hata oluştu.");
            } else {
                setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { likeMovie, unlikeMovie, isLoading, error };
};

export { useLike };
