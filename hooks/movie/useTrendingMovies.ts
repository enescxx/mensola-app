import { tmdbService } from "@/services/tmdb.service";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseTrendingMoviesOptions {
    enabled?: boolean;
}

export const useTrendingMovies = ({ enabled = true }: UseTrendingMoviesOptions) => {
    const { data, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
        useInfiniteQuery({
            queryKey: ["trending", "movies"],
            queryFn: async ({ pageParam = 1 }) => {
                const res = await tmdbService.getTrendingMovies(pageParam);
                return res.data;
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                if (!lastPage?.hasMore) {
                    return undefined;
                }
                return allPages.length + 1;
            },

            enabled: enabled ?? true,
            staleTime: 1000 * 60 * 30,
        });

    const movies = data?.pages.flatMap((page) => page?.items ?? []) ?? [];
    const totalResults = data?.pages[0]?.totalResults ?? 0;

    return { movies, totalResults, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, error };
};
