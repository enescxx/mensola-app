import { useCallback } from "react";
import { AlbumService } from "@/services/album.service";
import { useInteracion } from "../shared/useInteraction";
import { useDetailBase } from "../shared/useDetailBase";
import { useListItems } from "../shared/useListItems";
import { AlbumDetails, AlbumTracksResponseDataItem } from "@/types/album.types";
import { AlbumId } from "@/types/common.types";

export const useAlbumDetails = (albumId?: AlbumId) => {
    const {
        details: albumDetails,
        setDetails,
        fetchData,
        ...rest
    } = useDetailBase<AlbumDetails, AlbumId>({
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
    } = useListItems<AlbumTracksResponseDataItem>({
        listId: albumId,
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
        targetId: albumId,
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
