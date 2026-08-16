import { ApiResponse, InteractionTypes } from "@/types";
import { IMovieListInteractionItem } from "@/types/movie";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";

interface InteractionData {
    rating?: number;
    comment?: string;
    isLiked?: boolean;
}
interface UseInteractionOptions {
    targetId?: string;
    targetType?: InteractionTypes;
    createOrUpdateInteraction?: (id: string, data: InteractionData) => Promise<void>;
    getFn?: (id: string, page: number, limit: number) => Promise<ApiResponse>;
    refreshFn?: (isRefreshing: boolean) => Promise<void>;
    limit?: number;
}

export const useInteracion = <T extends object>({
    targetId,
    targetType,
    createOrUpdateInteraction,
    getFn,
    refreshFn,
    limit,
}: UseInteractionOptions) => {
    limit = limit || 20;

    const {
        data,
        fetchNextPage: loadMoreInteractions,
        refetch: refetchInteractions,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["interactions", targetType, targetId],
        queryFn: async ({ pageParam }) => {
            if (!targetId || !getFn) return [];
            const response = await getFn(targetId, pageParam, limit);
            return response.data.items;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < limit) {
                return undefined;
            }

            return allPages.length + 1;
        },
        enabled: !!targetId && !!getFn,
    });

    const interactions: T[] = data?.pages.flat() || [];

    const submitInteraction = useCallback(
        async (data: InteractionData) => {
            if (!targetId || !createOrUpdateInteraction) return;
            await createOrUpdateInteraction(targetId, data);

            if (refreshFn) {
                await refreshFn(true);
            }
        },
        [targetId],
    );

    return {
        submitInteraction,
        interactions,
        loadMoreInteractions,
        refetchInteractions,
        hasNextPage,
        isFetchingNextPage,
    };
};
