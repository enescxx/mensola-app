import { useCallback } from "react";
import { AlbumService } from "@/services/album.service";
import { useInteracion } from "../shared/useInteraction";
import { useDetailBase } from "../shared/useDetailBase";
import { useListItems } from "../shared/useListItems";
import { AlbumDetails, AlbumTracksResponseDataItem } from "@/types/album.types";
import { AlbumId, SpotifyId } from "@/types/common.types";

export const useAlbumDetails = (albumId?: AlbumId | SpotifyId, type: "app" | "spotify" = "app") => {
    const {
        details: albumDetails,
        setDetails,
        fetchData,
        ...rest
    } = useDetailBase<AlbumDetails, AlbumId | SpotifyId>({
        id: albumId,
        fetcher: (id) => {
            if (type === "spotify") {
                return AlbumService.findOrFetchSpotifyAlbum(id as SpotifyId);
            }
            return AlbumService.getAlbumDetails(id as AlbumId);
        },
        onLike: (id) => AlbumService.likeAlbum(id as AlbumId),
        onUnlike: (id) => AlbumService.unlikeAlbum(id as AlbumId),
        getIsLiked: (d) => !!d.isLiked,
        getLikesCount: (d) => d.likesCount ?? 0,
        updateLike: (d, isLiked, count) => ({ ...d, isLiked, likesCount: count }),
    });

    const dbAlbumId = albumDetails?.id || (type === "app" ? (albumId as AlbumId) : undefined);

    const {
        items: tracks,
        fetchNextPage: loadMoreTracks,
        refetch: refetchTracks,
        hasNextPage: hasNextTrackPage,
        isFetchingNextPage: isFetchingNextTrackPage,
    } = useListItems<AlbumTracksResponseDataItem>({
        listId: dbAlbumId,
        itemType: "track",
        getFn: async (id, page, limit) => await AlbumService.getAlbumTracks({ albumId: id as AlbumId, page, limit }),
        limit: 18,
    });

    const {
        submitInteraction,
        interactions,
        loadMoreInteractions,
        refetchInteractions,
        hasNextPage: hasNextInteractionsPage,
        isFetchingNextPage: isFetchingNextInteractionPage,
    } = useInteracion({
        targetId: dbAlbumId,
        targetType: "album",
        createOrUpdateInteraction: async (data) => {
            await AlbumService.createOrUpdateInteraction(data);
        },
        refreshFn: async (isRefreshing) => {
            await fetchData(isRefreshing);
        },
        getFn: async (data) => await AlbumService.getAlbumInteractions(data),
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
