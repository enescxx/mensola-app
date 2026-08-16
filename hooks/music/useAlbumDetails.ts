import { useState, useCallback, useEffect } from "react";
import { AlbumService } from "@/services/album.service";
import { useInteracion } from "../shared/useInteraction";
import { useDetailBase } from "../shared/useDetailBase";
import { useListItems } from "../shared/useListItems";

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
    const {
        details: albumDetails,
        setDetails,
        fetchData,
        ...rest
    } = useDetailBase<IAlbumDetails>({
        id: albumId,
        fetcher: (id) => AlbumService.getAlbumDetails(id),
        onLike: (id) => AlbumService.likeAlbum(id),
        onUnlike: (id) => AlbumService.unlikeAlbum(id),
        getIsLiked: (d) => !!d.isLiked,
        getLikesCount: (d) => d.likesCount ?? 0,
        updateLike: (d, isLiked, count) => ({ ...d, isLiked, likesCount: count }),
    });

    const {
        items: tracks,
        fetchNextPage: loadMoreTracks,
        refetch: refetchTracks,
        hasNextPage: hasNextTrackPage,
        isFetchingNextPage: isFetchingNextTrackPage,
    } = useListItems<IAlbumTrackItem>({
        listId: albumId,
        itemType: "track",
        getFn: async (id, page, limit) => await AlbumService.getAlbumTracks(id, page, limit),
        limit: 18,
    });

    const {
        submitInteraction,
        interactions,
        loadMoreInteractions,
        refetchInteractions,
        hasNextPage: hasNextInteractionsPage,
        isFetchingNextPage: isFetchingNextInteractionPage,
    } = useInteracion<IAlbumInteractionItem>({
        targetId: albumId,
        targetType: "album",
        createOrUpdateInteraction: async (id, data) => {
            await AlbumService.createOrUpdateInteraction(id, data);
        },
        refreshFn: async (isRefreshing) => {
            await fetchData(isRefreshing);
        },
        getFn: async (id, page, limit) => await AlbumService.getAlbumInteractions(id, page, limit),
        limit: 20,
    });

    const refetchAll = useCallback(async () => {
        await Promise.all([fetchData(true), refetchInteractions(), refetchTracks()]);
    }, [fetchData, refetchInteractions, refetchTracks]);

    return {
        refetchAll,
        albumDetails,
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
