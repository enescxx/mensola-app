import {
    InteractionItemResponse,
    InteractionsRequest,
    InteractionsResponse,
    InteractionTargetId,
    InteractionTargetTypes,
    UpsertInteractionRequest,
    UpsertInteractionSummary,
} from "@/types/interaction.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";

interface UseInteractionOptions {
    targetId?: InteractionTargetId;
    targetType?: InteractionTargetTypes;
    createOrUpdateInteraction?: (data: UpsertInteractionRequest) => Promise<void>;
    getFn?: (data: InteractionsRequest) => Promise<InteractionsResponse>;
    refreshFn?: (isRefreshing: boolean) => Promise<void>;
    limit?: number;
}

export const useInteracion = ({
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
            const response = await getFn({ targetId, page: pageParam, limit });
            return response.data?.items ?? [];
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

    const interactions: InteractionItemResponse[] = data?.pages.flat() || [];

    const submitInteraction = useCallback(
        async (interaction: UpsertInteractionSummary) => {
            if (!targetId || !createOrUpdateInteraction) return;
            await createOrUpdateInteraction({ targetId, interaction });

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
