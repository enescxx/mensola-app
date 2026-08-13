import { useState, useCallback, useEffect } from "react";
import { PlaylistService } from "@/services/playlist.service";
import { BookmarkService } from "@/services/bookmark.service";

export interface IPlaylistOwner {
    id: string;
    username: string;
    fullname?: string;
    avatar?: string | null;
    isFollowing?: boolean;
    isFollower?: boolean;
}

export interface IPlaylistDetails {
    id: string;
    title: string;
    description?: string;
    image?: string;
    isPrivate?: boolean;
    listType?: string;
    creatorId?: string;
    creator?: IPlaylistOwner;
    owners?: IPlaylistOwner[];
    isLiked?: boolean;

    likesCount?: number;
    savesCount?: number;
    songCount?: number;
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

export interface IPlaylistTrackItem {
    id: string;
    title: string;
    duration?: number;
    image?: string;
    addedAt?: string;
    addedBy?: string;
    isLiked?: boolean;
    artists?: { id: string; name: string }[];
}

export interface IPlaylistInteractionItem {
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

export const usePlaylistDetails = (playlistId?: string) => {
    const [playlistDetails, setPlaylistDetails] = useState<IPlaylistDetails | null>(null);
    const [tracks, setTracks] = useState<IPlaylistTrackItem[]>([]);
    const [interactions, setInteractions] = useState<IPlaylistInteractionItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRefetching, setIsRefetching] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchData = useCallback(
        async (isRefreshing = false) => {
            if (!playlistId) return;

            if (isRefreshing) {
                setIsRefetching(true);
            } else {
                setIsLoading(true);
            }
            setError("");

            try {
                const [detailsRes, itemsRes, interactionsRes] = await Promise.allSettled([
                    PlaylistService.getPlaylistDetails(playlistId),
                    PlaylistService.getPlaylistItems(playlistId, 1, 30),
                    PlaylistService.getPlaylistInteractions(playlistId, 1, 30),
                ]);

                if (detailsRes.status === "fulfilled" && detailsRes.value?.data) {
                    setPlaylistDetails(detailsRes.value.data);
                } else if (detailsRes.status === "rejected") {
                    setError("Playlist yüklenirken bir hata oluştu.");
                }

                if (itemsRes.status === "fulfilled" && itemsRes.value?.data) {
                    const itemsData = itemsRes.value.data.items || itemsRes.value.data || [];
                    setTracks(itemsData);
                }

                if (interactionsRes.status === "fulfilled" && interactionsRes.value?.data) {
                    const interactionsData = interactionsRes.value.data.items || interactionsRes.value.data || [];
                    setInteractions(interactionsData);
                }
            } catch (err: any) {
                setError(err?.message || "Playlist verileri yüklenirken bir hata oluştu.");
            } finally {
                setIsLoading(false);
                setIsRefetching(false);
            }
        },
        [playlistId],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const toggleLike = async () => {
        if (!playlistId || !playlistDetails) return;

        const currentIsLiked = !!playlistDetails.isLiked;
        const currentLikesCount = playlistDetails.likesCount || 0;
        const newIsLiked = !currentIsLiked;
        const newLikesCount = newIsLiked ? currentLikesCount + 1 : Math.max(0, currentLikesCount - 1);

        setPlaylistDetails((prev) => (prev ? { ...prev, isLiked: newIsLiked, likesCount: newLikesCount } : prev));

        try {
            if (currentIsLiked) {
                await PlaylistService.unlikePlaylist(playlistId);
            } else {
                await PlaylistService.likePlaylist(playlistId);
            }
        } catch {
            setPlaylistDetails((prev) =>
                prev ? { ...prev, isLiked: currentIsLiked, likesCount: currentLikesCount } : prev,
            );
        }
    };

    const submitInteraction = async (data: { rating?: number; comment?: string; isLiked?: boolean }) => {
        if (!playlistId) return;
        await PlaylistService.createOrUpdateInteraction(playlistId, data);
        await fetchData(true);
    };

    return {
        playlistDetails,
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
