import { ProfileService } from "@/services/profile.service";
import { UserId } from "@/types/common.types";
import { StatType } from "@/types/stat.types";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseStatDetailsOptions {
    statType: StatType;
    userId?: UserId;
    limit?: number;
}

export const useStatDetails = ({ statType, userId, limit }: UseStatDetailsOptions) => {
    limit = limit || 15;
    const { data, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, isRefetching } =
        useInfiniteQuery({
            queryKey: [statType, userId || "me"],
            queryFn: async ({ pageParam }) => {
                if (!statType) return [];
                const response = await ProfileService.getStatDetails({ statType, userId, page: pageParam, limit });

                return response.data?.items ?? [];
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage?.length < limit) return undefined;
                return allPages.length + 1;
            },
            enabled: !!statType,
        });

    const statData = data?.pages.flat();

    return { statData, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, isRefetching };
};
