import { useInfiniteQuery } from "@tanstack/react-query";
import { AlbumId, MovieListId, PaginationResponse, PlaylistId } from "@/types/common.types";
import { ApiResponse } from "@/types/api";

interface UseListItemsOptions<T, ID> {
    listId?: ID;
    itemType?: "track" | "movie";
    getFn?: (id: ID, page: number, limit: number) => Promise<ApiResponse<PaginationResponse & { items?: T[] }>>;
    limit?: number;
}

export const useListItems = <T extends object, ID = MovieListId | PlaylistId | AlbumId>({
    listId,
    itemType,
    getFn,
    limit,
}: UseListItemsOptions<T, ID>) => {
    limit = limit || 18;

    const { data, fetchNextPage, refetch, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["items", itemType, listId],
        queryFn: async ({ pageParam }) => {
            if (!listId || !getFn) return [];
            const response = await getFn(listId, pageParam, limit);
            return response.data?.items ?? [];
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < limit) {
                return undefined;
            }

            return allPages.length + 1;
        },
    });

    const items: T[] = data?.pages.flat() || [];

    return { items, fetchNextPage, refetch, hasNextPage, isFetchingNextPage };
};
