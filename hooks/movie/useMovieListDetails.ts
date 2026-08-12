import { useState, useCallback, useEffect } from "react";
import { MovieService } from "@/services/movie.service";
import { BookmarkService } from "@/services/bookmark.service";

export interface IMovieListItem {
    id: string;
    title: string;
    poster: string;
    rating?: number;
    isLiked?: boolean;
    hasReview?: boolean;
}

export interface IMovieListOwner {
    id: string;
    username: string;
    fullname: string;
    avatar: string | null;
    isFollowing?: boolean;
    isFollower?: boolean;
}

export interface IMovieListDetails {
    id: string;
    title: string;
    description?: string;
    image?: string;
    isPrivate?: boolean;
    listType?: string;
    creatorId?: string;
    owners?: IMovieListOwner[];
    isLiked?: boolean;
    isSaved?: boolean;
    likesCount?: number;
    savesCount?: number;
    currentUserInteraction?: {
        id?: string;
        rating?: number;
        isLiked?: boolean;
        comment?: {
            id?: string;
            content?: string;
            date?: string;
        };
    } | null;
}

export interface IMovieListInteractionItem {
    id: string;
    rating?: number;
    isLiked?: boolean;
    user: {
        id: string;
        username: string;
        fullname?: string;
        avatar?: string;
    };
    comment: {
        id: string;
        content: string;
        date: string;
    };
    likeCount: number;
    replyCount: number;
}

export const useMovieListDetails = (listId?: string) => {
    const [listDetails, setListDetails] = useState<IMovieListDetails | null>(null);
    const [movies, setMovies] = useState<IMovieListItem[]>([]);
    const [interactions, setInteractions] = useState<IMovieListInteractionItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRefetching, setIsRefetching] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchData = useCallback(async (isRefreshing = false) => {
        if (!listId) return;

        if (isRefreshing) {
            setIsRefetching(true);
        } else {
            setIsLoading(true);
        }
        setError("");

        try {
            const [detailsRes, itemsRes, interactionsRes] = await Promise.allSettled([
                MovieService.getMovieListDetails(listId),
                MovieService.getMovieListItems(listId, 1, 30),
                MovieService.getMovieListInteractions(listId, 1, 30),
            ]);

            if (detailsRes.status === "fulfilled" && detailsRes.value?.data) {
                const data = detailsRes.value.data;
                setListDetails(data);

                // If previewMovies are included in details response and items endpoint failed or returned empty
                if (data.previewMovies && (!itemsRes || itemsRes.status !== "fulfilled")) {
                    setMovies(data.previewMovies);
                }
            }

            if (itemsRes.status === "fulfilled" && itemsRes.value?.data) {
                const itemsData = itemsRes.value.data.items || itemsRes.value.data || [];
                setMovies(itemsData);
            }

            if (interactionsRes.status === "fulfilled" && interactionsRes.value?.data) {
                const interactionsData = interactionsRes.value.data.items || interactionsRes.value.data || [];
                setInteractions(interactionsData);
            }
        } catch (err: any) {
            setError(err?.message || "Liste verileri yüklenirken bir hata oluştu.");
        } finally {
            setIsLoading(false);
            setIsRefetching(false);
        }
    }, [listId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const toggleLike = async () => {
        if (!listId || !listDetails) return;

        const currentIsLiked = !!listDetails.isLiked;
        const currentLikesCount = listDetails.likesCount || 0;
        const newIsLiked = !currentIsLiked;
        const newLikesCount = newIsLiked ? currentLikesCount + 1 : Math.max(0, currentLikesCount - 1);

        // Optimistic Update
        setListDetails((prev) => (prev ? { ...prev, isLiked: newIsLiked, likesCount: newLikesCount } : prev));

        try {
            if (currentIsLiked) {
                await MovieService.unlikeMovieList(listId);
            } else {
                await MovieService.likeMovieList(listId);
            }
        } catch (err) {
            // Revert on error
            setListDetails((prev) => (prev ? { ...prev, isLiked: currentIsLiked, likesCount: currentLikesCount } : prev));
        }
    };

    const toggleSave = async () => {
        if (!listId || !listDetails) return;

        const currentIsSaved = !!listDetails.isSaved;
        const currentSavesCount = listDetails.savesCount || 0;
        const newIsSaved = !currentIsSaved;
        const newSavesCount = newIsSaved ? currentSavesCount + 1 : Math.max(0, currentSavesCount - 1);

        // Optimistic Update
        setListDetails((prev) => (prev ? { ...prev, isSaved: newIsSaved, savesCount: newSavesCount } : prev));

        try {
            const res = await BookmarkService.toggleBookmark(listId, "movieList");
            const isSavedResult = res.data?.isSaved;
            if (typeof isSavedResult === "boolean") {
                setListDetails((prev) => (prev ? { ...prev, isSaved: isSavedResult } : prev));
            }
        } catch (err) {
            // Revert on error
            setListDetails((prev) => (prev ? { ...prev, isSaved: currentIsSaved, savesCount: currentSavesCount } : prev));
        }
    };

    const submitInteraction = async (data: { rating?: number; comment?: string; isLiked?: boolean }) => {
        if (!listId) return;
        await MovieService.createOrUpdateListInteraction(listId, data);
        await fetchData(true);
    };

    return {
        listDetails,
        movies,
        interactions,
        isLoading,
        isRefetching,
        error,
        refetch: () => fetchData(true),
        toggleLike,
        toggleSave,
        submitInteraction,
    };
};
