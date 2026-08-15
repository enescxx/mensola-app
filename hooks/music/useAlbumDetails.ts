import { useState, useCallback, useEffect } from "react";
import { AlbumService } from "@/services/album.service";

export interface IAlbumArtist {
    id: string;
    name: string;
    avatar?: string | null;
}

export interface IAlbumDetails {
    id: string;
    title: string;
    description?: string;
    image?: string;
    releaseDate?: string;
    songCount?: number;
    artists?: IAlbumArtist[];
    isLiked?: boolean;
    likesCount?: number;
    commentsCount?: number;
    currentUserInteraction?: {
        id?: string;
        rating?: number | string;
        isLiked?: boolean;
        comment?: {
            id?: string;
            content?: string;
            date?: string;
        };
    } | null;
}

export interface IAlbumTrackItem {
    id: string;
    title: string;
    duration?: number;
    image?: string;
    isLiked?: boolean;
    artists?: { id: string; name: string }[];
}

export interface IAlbumInteractionItem {
    id: string;
    rating?: number | string;
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

export const useAlbumDetails = (albumId?: string) => {
    const [albumDetails, setAlbumDetails] = useState<IAlbumDetails | null>(null);
    const [tracks, setTracks] = useState<IAlbumTrackItem[]>([]);
    const [interactions, setInteractions] = useState<IAlbumInteractionItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRefetching, setIsRefetching] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchData = useCallback(
        async (isRefreshing = false) => {
            if (!albumId) return;

            if (isRefreshing) {
                setIsRefetching(true);
            } else {
                setIsLoading(true);
            }
            setError("");

            try {
                const [detailsRes, tracksRes, interactionsRes] = await Promise.allSettled([
                    AlbumService.getAlbumDetails(albumId),
                    AlbumService.getAlbumTracks(albumId, 1, 30),
                    AlbumService.getAlbumInteractions(albumId, 1, 30),
                ]);

                if (detailsRes.status === "fulfilled" && detailsRes.value?.data) {
                    setAlbumDetails(detailsRes.value.data);
                } else if (detailsRes.status === "rejected") {
                    setError("Albüm yüklenirken bir hata oluştu.");
                }

                if (tracksRes.status === "fulfilled" && tracksRes.value?.data) {
                    const tracksData = tracksRes.value.data.items || tracksRes.value.data || [];
                    setTracks(tracksData);
                }

                if (interactionsRes.status === "fulfilled" && interactionsRes.value?.data) {
                    const interactionsData = interactionsRes.value.data.items || interactionsRes.value.data || [];
                    setInteractions(interactionsData);
                }
            } catch (err: any) {
                setError(err?.message || "Albüm verileri yüklenirken bir hata oluştu.");
            } finally {
                setIsLoading(false);
                setIsRefetching(false);
            }
        },
        [albumId],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const toggleLike = async () => {
        if (!albumId || !albumDetails) return;

        const currentIsLiked = !!albumDetails.isLiked;
        const currentLikesCount = albumDetails.likesCount || 0;
        const newIsLiked = !currentIsLiked;
        const newLikesCount = newIsLiked ? currentLikesCount + 1 : Math.max(0, currentLikesCount - 1);

        setAlbumDetails((prev) => (prev ? { ...prev, isLiked: newIsLiked, likesCount: newLikesCount } : prev));

        try {
            if (currentIsLiked) {
                await AlbumService.unlikeAlbum(albumId);
            } else {
                await AlbumService.likeAlbum(albumId);
            }
        } catch {
            setAlbumDetails((prev) =>
                prev ? { ...prev, isLiked: currentIsLiked, likesCount: currentLikesCount } : prev,
            );
        }
    };

    const submitInteraction = async (data: { rating?: number; comment?: string; isLiked?: boolean }) => {
        if (!albumId) return;
        await AlbumService.createOrUpdateInteraction(albumId, data);
        await fetchData(true);
    };

    return {
        albumDetails,
        tracks,
        interactions,
        isLoading,
        isRefetching,
        error,
        refetch: () => fetchData(true),
        toggleLike,
        submitInteraction,
    };
};
