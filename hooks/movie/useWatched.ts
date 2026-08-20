import { useState } from "react";

import { MovieService } from "@/services/movie.service";
import { MovieId } from "@/types/common.types";

const useWatched = (defaultMovieId?: MovieId) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const markAsWatched = async (targetMovieId?: MovieId | (() => void), onSuccess?: () => void) => {
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
            const response = await MovieService.markAsWatched(id);
            callback?.();
            return response;
        } catch (err: any) {
            if (err && err.success === false) {
                const apiErrorMessage = err.error?.message || err?.message;
                setError(apiErrorMessage || "Film izlendi olarak işaretlenirken bir hata oluştu.");
            } else {
                setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const unmarkAsWatched = async (targetMovieId?: MovieId | (() => void), onSuccess?: () => void) => {
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
            const response = await MovieService.unmarkAsWatched(id);
            callback?.();
            return response;
        } catch (err: any) {
            if (err && err.success === false) {
                const apiErrorMessage = err.error?.message || err?.message;
                setError(apiErrorMessage || "Film izlenenlerden kaldırılırken bir hata oluştu.");
            } else {
                setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { markAsWatched, unmarkAsWatched, isLoading, error };
};

export { useWatched };
