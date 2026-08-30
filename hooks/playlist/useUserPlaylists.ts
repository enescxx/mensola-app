import { useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { PlaylistService } from "@/services/playlist.service";
import { GetPlaylistsResponseDataItem } from "@/types/playlist.types";
import { PlaylistId, TrackId } from "@/types/common.types";

export interface IPlaylistItemOption {
    id: PlaylistId;
    title: string;
    isChecked: boolean;
}

const DEFAULT_LIMIT = 20;

const toPlaylistOption = (item: GetPlaylistsResponseDataItem): IPlaylistItemOption => ({
    id: item.id,
    title: item.title,
    isChecked: Boolean(item.containsTrack),
});

const QUERY_KEY = (trackId?: TrackId) => ["userPlaylists", trackId ?? "all"];

export const useUserPlaylists = (trackId?: TrackId) => {
    const queryClient = useQueryClient();
    const [actionLoadingId, setActionLoadingId] = useState<PlaylistId | null>(null);
    const [error, setError] = useState<string>("");

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, refetch } = useInfiniteQuery(
        {
            queryKey: QUERY_KEY(trackId),
            queryFn: async ({ pageParam }) => {
                const response = await PlaylistService.getUserPlaylists({
                    trackId,
                    page: pageParam,
                    limit: DEFAULT_LIMIT,
                });
                return response.data;
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                if (!lastPage?.hasMore) return undefined;
                return allPages.length + 1;
            },
            enabled: !!trackId,
        },
    );

    const playlists: IPlaylistItemOption[] = (data?.pages ?? []).flatMap((page) =>
        (page?.items ?? []).map(toPlaylistOption),
    );

    const togglePlaylistSelection = async (playlistId: PlaylistId) => {
        if (!trackId) return;

        const target = playlists.find((p) => p.id === playlistId);
        if (!target) return;

        const currentlyChecked = target.isChecked;
        setActionLoadingId(playlistId);
        setError("");

        // Optimistic update in query cache
        queryClient.setQueryData(QUERY_KEY(trackId), (old: typeof data) => {
            if (!old) return old;
            return {
                ...old,
                pages: old.pages.map((page) => ({
                    ...page,
                    items: page?.items?.map((item) =>
                        item.id === playlistId ? { ...item, containsTrack: !currentlyChecked } : item,
                    ),
                })),
            };
        });

        try {
            if (currentlyChecked) {
                await PlaylistService.removeTrackFromPlaylist(playlistId, trackId);
            } else {
                await PlaylistService.addTrackToPlaylist(playlistId, trackId);
            }
        } catch (err: any) {
            // Revert optimistic update
            queryClient.setQueryData(QUERY_KEY(trackId), (old: typeof data) => {
                if (!old) return old;
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        items: page?.items?.map((item) =>
                            item.id === playlistId ? { ...item, containsTrack: currentlyChecked } : item,
                        ),
                    })),
                };
            });

            if (err?.success === false) {
                setError(err.error?.message || err?.message || "İşlem sırasında bir hata oluştu.");
            } else {
                setError("Sunucuya bağlanılamadı.");
            }
        } finally {
            setActionLoadingId(null);
        }
    };

    return {
        playlists,
        isLoading,
        isLoadingMore: isFetchingNextPage,
        isRefetching,
        actionLoadingId,
        error,
        hasMore: hasNextPage ?? false,
        fetchUserPlaylists: refetch,
        loadMore: fetchNextPage,
        togglePlaylistSelection,
    };
};
