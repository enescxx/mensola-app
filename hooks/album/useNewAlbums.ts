import { spotifyService } from "@/services/spotify.service";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseNewAlbumsOptions {
    limit?: number;
    enabled?: boolean;
}

export const useNewAlbums = ({ limit = 9, enabled = true }: UseNewAlbumsOptions) => {
    const { data, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
        useInfiniteQuery({
            queryKey: ["new", "albums", limit],
            queryFn: async ({ pageParam = 1 }) => {
                const res = await spotifyService.getNewAlbums({ page: pageParam, limit });
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

    const albums = data?.pages.flatMap((page) => page?.items ?? []) ?? [];
    const totalResults = data?.pages[0]?.totalResults ?? 0;

    return { albums, totalResults, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, error };
};
