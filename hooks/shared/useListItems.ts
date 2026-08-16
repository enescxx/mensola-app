import { ApiResponse, IMovieListItem } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IPlaylistTrackItem } from "../music/usePlaylistDetails";

interface UseListItemsOptions {
    listId?: string;
    itemType?: "track" | "movie";
    getFn?: (id: string, page: number, limit: number) => Promise<ApiResponse>;
    limit?: number;
}

export const useListItems = <T extends object>({ listId, itemType, getFn, limit }: UseListItemsOptions) => {
    limit = limit || 18;

    const { data, fetchNextPage, refetch, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["items", itemType, listId],
        queryFn: async ({ pageParam }) => {
            if (!listId || !getFn) return [];
            const response = await getFn(listId, pageParam, limit);
            return response.data.items;
        },
        initialPageParam: 1,
        getNextPageParam: () => {},
    });

    const items: T[] = data?.pages.flat() || [];

    return { items, fetchNextPage, refetch, hasNextPage, isFetchingNextPage };
};
