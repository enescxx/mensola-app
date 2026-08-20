import { useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { MovieService } from "@/services/movie.service";
import { GetListsResponseDataItem } from "@/types/movie.types";
import { MovieId, MovieListId } from "@/types/common.types";

export interface IMovieListOption {
    id: MovieListId | "watchlist";
    title: string;
    isWatchlist: boolean;
    isChecked: boolean;
}

const DEFAULT_LIMIT = 20;

const toListOption = (item: GetListsResponseDataItem, movieId?: MovieId): IMovieListOption => ({
    id: item.listId,
    title: item.listTitle,
    isWatchlist: false,
    isChecked:
        item.containsMovie !== undefined
            ? Boolean(item.containsMovie)
            : Array.isArray(item.previewMovies)
              ? item.previewMovies.some((m) => m.id === movieId)
              : false,
});

const QUERY_KEY = (movieId?: MovieId) => ["userMovieLists", movieId ?? "all"];

const useMovieLists = (movieId?: MovieId, initialIsWatchlisted?: boolean) => {
    const queryClient = useQueryClient();
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, refetch } = useInfiniteQuery(
        {
            queryKey: QUERY_KEY(movieId),
            queryFn: async ({ pageParam }) => {
                const response = await MovieService.getUserLists({ movieId, page: pageParam, limit: DEFAULT_LIMIT });
                return response.data;
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                if (!lastPage?.hasMore) return undefined;
                return allPages.length + 1;
            },
            enabled: !!movieId,
        },
    );

    const watchlistOption: IMovieListOption = {
        id: "watchlist",
        title: "İzleme Listesi",
        isWatchlist: true,
        isChecked: initialIsWatchlisted ?? false,
    };

    const fetchedLists: IMovieListOption[] = (data?.pages ?? []).flatMap((page) =>
        (page?.items ?? []).map((item) => toListOption(item, movieId)),
    );

    const lists: IMovieListOption[] = [watchlistOption, ...fetchedLists];

    const toggleListSelection = async (
        listId: MovieListId,
        isWatchlist: boolean,
        onStatusChange?: (newListState: { isWatchlisted: boolean; isInList: boolean }) => void,
    ) => {
        if (!movieId) return;

        const target = lists.find((l) => l.id === listId);
        if (!target) return;

        const currentlyChecked = target.isChecked;
        const newChecked = !currentlyChecked;
        setActionLoadingId(listId);
        setError("");

        // Optimistic update: for watchlist we update local state via onStatusChange,
        // for regular lists we update the query cache directly
        if (!isWatchlist) {
            queryClient.setQueryData(QUERY_KEY(movieId), (old: typeof data) => {
                if (!old) return old;
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        items: page?.items?.map((item) =>
                            item.listId === listId ? { ...item, containsMovie: newChecked } : item,
                        ),
                    })),
                };
            });
        }

        if (onStatusChange) {
            const isWatchlisted = isWatchlist ? newChecked : (initialIsWatchlisted ?? false);
            const isInList = isWatchlisted || fetchedLists.some((l) => (l.id === listId ? newChecked : l.isChecked));
            onStatusChange({ isWatchlisted, isInList });
        }

        try {
            if (isWatchlist) {
                if (currentlyChecked) {
                    await MovieService.removeFromWatchlist(movieId);
                } else {
                    await MovieService.addToWatchlist(movieId);
                }
            } else {
                if (currentlyChecked) {
                    await MovieService.removeMovieFromList(listId, movieId);
                } else {
                    await MovieService.addMovieToList(listId, movieId);
                }
            }
        } catch (err: any) {
            // Revert optimistic update
            if (!isWatchlist) {
                queryClient.setQueryData(QUERY_KEY(movieId), (old: typeof data) => {
                    if (!old) return old;
                    return {
                        ...old,
                        pages: old.pages.map((page) => ({
                            ...page,
                            items: page?.items?.map((item) =>
                                item.listId === listId ? { ...item, containsMovie: currentlyChecked } : item,
                            ),
                        })),
                    };
                });
            }

            if (onStatusChange) {
                const isWatchlisted = isWatchlist ? currentlyChecked : (initialIsWatchlisted ?? false);
                const isInList =
                    isWatchlisted || fetchedLists.some((l) => (l.id === listId ? currentlyChecked : l.isChecked));
                onStatusChange({ isWatchlisted, isInList });
            }

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
        lists,
        isLoading,
        isLoadingMore: isFetchingNextPage,
        isRefetching,
        actionLoadingId,
        error,
        hasMore: hasNextPage ?? false,
        fetchUserLists: refetch,
        loadMore: fetchNextPage,
        toggleListSelection,
    };
};

export { useMovieLists };
