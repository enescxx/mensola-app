import { ApiResponse } from "@/types/api";
import { MovieLikeActionsResponse } from "@/types/movie.types";
import { useState, useCallback, useEffect } from "react";

interface UseDetailBaseOptions<T, ID> {
    id?: ID;
    fetcher: (id: ID) => Promise<ApiResponse<T>>;
    onLike?: (id: ID) => Promise<ApiResponse<any>>;
    onUnlike?: (id: ID) => Promise<ApiResponse<any>>;
    getLikesCount?: (details: T) => number;
    getIsLiked?: (details: T) => boolean;
    updateLike?: (details: T, newIsLiked: boolean, newCount: number) => T;
}

export const useDetailBase = <T extends object, ID>({
    id,
    fetcher,
    onLike,
    onUnlike,
    getLikesCount,
    getIsLiked,
    updateLike,
}: UseDetailBaseOptions<T, ID>) => {
    const [details, setDetails] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefetching, setIsRefetching] = useState(false);
    const [error, setError] = useState("");

    const fetchData = useCallback(
        async (isRefreshing = false) => {
            if (!id) return;
            isRefreshing ? setIsRefetching(true) : setIsLoading(true);
            setError("");
            try {
                const res = await fetcher(id);
                if (res.data) setDetails(res.data);
                else setError("Veri yüklenemedi.");
            } catch (err: any) {
                setError(err?.message ?? "Bir hata oluştu.");
            } finally {
                setIsLoading(false);
                setIsRefetching(false);
            }
        },
        [id, fetcher],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const toggleLike = useCallback(async () => {
        if (!id || !details || !onLike || !onUnlike || !getLikesCount || !getIsLiked || !updateLike) return;

        const currentIsLiked = getIsLiked(details);
        const currentCount = getLikesCount(details);
        const newIsLiked = !currentIsLiked;
        const newCount = newIsLiked ? currentCount + 1 : Math.max(0, currentCount - 1);

        setDetails((prev) => (prev ? updateLike(prev, newIsLiked, newCount) : prev));

        try {
            if (currentIsLiked) await onUnlike(id);
            else await onLike(id);
        } catch {
            setDetails((prev) => (prev ? updateLike(prev, currentIsLiked, currentCount) : prev));
        }
    }, [id, details, onLike, onUnlike, getLikesCount, getIsLiked, updateLike]);

    return { details, isLoading, isRefetching, error, fetchData, toggleLike, setDetails };
};
