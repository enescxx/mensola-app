import { spotifyService } from "@/services/spotify.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useTrackSearch = (query: string) => {
    const limit = 10;
    const trimmedQuery = query.trim();

    const { data, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
        useInfiniteQuery({
            queryKey: ["tracks", "search", trimmedQuery],
            queryFn: async ({ pageParam = 1 }) => {
                const res = await spotifyService.searchTrack({
                    query: trimmedQuery,
                    page: pageParam,
                    limit: limit,
                });

                console.log(res.data?.items);

                return res.data;
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                if (!lastPage?.hasMore) {
                    return undefined;
                }
                return allPages.length + 1;
            },

            enabled: trimmedQuery.length >= 2,
        });

    const tracks = data?.pages.flatMap((page) => page?.items ?? []) ?? [];
    const totalResults = data?.pages[0]?.totalResults ?? 0;

    return { tracks, totalResults, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, error };
};
