import { useState, useEffect, useCallback } from "react";

import { MovieService } from "../../services/movie.service";
import { MovieDetails } from "@/types/movie.types";
import { MovieId, TmdbId } from "@/types/common.types";

const useMovie = (movieId?: MovieId | TmdbId, type: "app" | "tmdb" = "app") => {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchMovie = useCallback(async () => {
        if (!movieId) {
            setMovie(null);
            setError("");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            if (type === "tmdb") {
                console.log(type);
                const response = await MovieService.findOrFetchMovie(movieId as TmdbId);
                console.log(response.data);
                setMovie(response.data || null);
            } else {
                const response = await MovieService.getMovie(movieId as MovieId);
                console.log(response.data);
                setMovie(response.data || null);
            }
        } catch (fetchError: any) {
            if (fetchError && fetchError.success === false) {
                const apiErrorMessage = fetchError.error?.message || fetchError?.message;
                setError(apiErrorMessage || "Film bilgileri alınırken bir hata oluştu.");
            } else {
                setError("Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [movieId]);

    useEffect(() => {
        fetchMovie();
    }, [fetchMovie]);

    return { movie, isLoading, error };
};

export { useMovie };
