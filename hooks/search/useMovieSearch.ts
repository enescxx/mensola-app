import { tmdbService } from "@/services/tmdb.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMovieSearch = (query: string) => {
    const trimmedQuery = query.trim();

    const { data, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isFetching, isLoading, isError, error } =
        useInfiniteQuery({
            queryKey: ["movies", "search", trimmedQuery],
            queryFn: async ({ pageParam = 1 }) => {
                const res = await tmdbService.searchMovie({
                    query: trimmedQuery,
                    page: pageParam,
                });
                return res.data;
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                if (!lastPage?.hasMore) {
                    return undefined;
                }
                return allPages.length + 1;
            },

            enabled: trimmedQuery.length >= 1,
        });

    const movies = data?.pages.flatMap((page) => page?.items ?? []) ?? [];
    const totalResults = data?.pages[0]?.totalResults ?? 0;

    return { movies, totalResults, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isFetching, isLoading, isError, error };
};
