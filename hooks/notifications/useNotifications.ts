import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService, NotificationsData } from "@/services/notification.service";
import { NotificationItem } from "@/components/notifications/types";

export interface UseNotificationsReturn {
    notifications: NotificationItem[];
    isLoading: boolean;
    isRefetching: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    acceptRequest: (id: string) => Promise<void>;
    declineRequest: (id: string) => Promise<void>;
}

export const useNotifications = (): UseNotificationsReturn => {
    const queryClient = useQueryClient();

    const { data, isLoading, isRefetching, error, refetch } = useQuery<NotificationsData>({
        queryKey: ["notifications"],
        queryFn: async () => {
            const response = await notificationService.getNotifications();
            if (!response.success || !response.data) {
                throw new Error("Bildirimler yüklenirken bir sorun oluştu.");
            }
            return response.data;
        },
    });

    const acceptMutation = useMutation({
        mutationFn: async (requesterId: string) => {
            return await notificationService.acceptFollowRequest(requesterId);
        },
        onMutate: async (requesterId: string) => {
            await queryClient.cancelQueries({ queryKey: ["notifications"] });
            const previousData = queryClient.getQueryData<NotificationsData>(["notifications"]);

            if (previousData) {
                queryClient.setQueryData<NotificationsData>(["notifications"], {
                    ...previousData,
                    followRequests: previousData.followRequests.map((item) =>
                        item.id === requesterId ? { ...item, status: "accepted" as const } : item
                    ),
                });
            }

            return { previousData };
        },
        onError: (_err, _requesterId, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(["notifications"], context.previousData);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["homeData"] });
        },
    });

    const declineMutation = useMutation({
        mutationFn: async (requesterId: string) => {
            return await notificationService.declineFollowRequest(requesterId);
        },
        onMutate: async (requesterId: string) => {
            await queryClient.cancelQueries({ queryKey: ["notifications"] });
            const previousData = queryClient.getQueryData<NotificationsData>(["notifications"]);

            if (previousData) {
                queryClient.setQueryData<NotificationsData>(["notifications"], {
                    ...previousData,
                    followRequests: previousData.followRequests.map((item) =>
                        item.id === requesterId ? { ...item, status: "declined" as const } : item
                    ),
                });
            }

            return { previousData };
        },
        onError: (_err, _requesterId, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(["notifications"], context.previousData);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["homeData"] });
        },
    });

    const notifications: NotificationItem[] = data?.followRequests ?? [];

    const handleRefetch = async () => {
        await refetch();
    };

    const handleAcceptRequest = async (id: string) => {
        await acceptMutation.mutateAsync(id);
    };

    const handleDeclineRequest = async (id: string) => {
        await declineMutation.mutateAsync(id);
    };

    return {
        notifications,
        isLoading,
        isRefetching,
        error: error ? (error instanceof Error ? error.message : "Sunucuya bağlanılamadı.") : null,
        refetch: handleRefetch,
        acceptRequest: handleAcceptRequest,
        declineRequest: handleDeclineRequest,
    };
};
