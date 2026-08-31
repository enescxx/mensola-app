import { UserService } from "@/services/user.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useUserSearch = (query: string) => {
    const trimmedQuery = query.trim();

    const { data, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
        useInfiniteQuery({
            queryKey: ["users", "search", trimmedQuery],
            queryFn: async ({ pageParam = 1 }) => {
                const res = await UserService.searchUsers({
                    q: trimmedQuery,
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
            enabled: trimmedQuery.length >= 2,
        });

    const users = data?.pages.flatMap((page) => page?.items ?? []) ?? [];

    return { users, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, error };
};
