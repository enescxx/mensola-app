import { useState, useCallback, useEffect } from "react";
import { PlaylistService } from "@/services/playlist.service";
import { BookmarkService } from "@/services/bookmark.service";
import { useInteracion } from "../shared/useInteraction";
import { useDetailBase } from "../shared/useDetailBase";
import { useListItems } from "../shared/useListItems";

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
    const {
        details: playlistDetails,
        setDetails,
        fetchData,
        ...rest
    } = useDetailBase<IPlaylistDetails>({
        id: playlistId,
        fetcher: (id) => PlaylistService.getPlaylistDetails(id),
        onLike: (id) => PlaylistService.likePlaylist(id),
        onUnlike: (id) => PlaylistService.unlikePlaylist(id),
        getIsLiked: (d) => !!d.isLiked,
        getLikesCount: (d) => d.likesCount ?? 0,
        updateLike: (d, isLiked, count) => ({ ...d, isLiked, likesCount: count }),
    });

    const {
        items: tracks,
        fetchNextPage: loadMoreTracks,
        refetch: refetchMovies,
        hasNextPage: hasNextTrackPage,
        isFetchingNextPage: isFetchingNextTrackPage,
    } = useListItems<IPlaylistTrackItem>({
        listId: playlistId,
        itemType: "track",
        getFn: async (id, page, limit) => await PlaylistService.getPlaylistItems(id, page, limit),
        limit: 18,
    });

    const {
        submitInteraction,
        interactions,
        loadMoreInteractions,
        refetchInteractions,
        hasNextPage: hasNextInteractionsPage,
        isFetchingNextPage: isFetchingNextInteractionPage,
    } = useInteracion<IPlaylistInteractionItem>({
        targetId: playlistId,
        targetType: "playlist",
        createOrUpdateInteraction: async (id, data) => {
            await PlaylistService.createOrUpdateInteraction(id, data);
        },
        refreshFn: async (isRefreshing) => {
            await fetchData(isRefreshing);
        },
        getFn: async (id, page, limit) => await PlaylistService.getPlaylistInteractions(id, page, limit),
        limit: 20,
    });

    const refetchAll = useCallback(async () => {
        await Promise.all([fetchData(true), refetchInteractions(), refetchMovies()]);
    }, [fetchData, refetchInteractions, refetchMovies]);

    return {
        refetchAll,
        playlistDetails,
        tracks,
        loadMoreTracks,
        hasNextTrackPage,
        isFetchingNextTrackPage,
        interactions,
        submitInteraction,
        loadMoreInteractions,
        hasNextInteractionsPage,
        isFetchingNextInteractionPage,
        ...rest,
    };
};
