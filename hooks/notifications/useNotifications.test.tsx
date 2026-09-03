import React from "react";
import { renderHook, waitFor, act } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNotifications } from "./useNotifications";
import { notificationService } from "@/services/notification.service";

jest.mock("@/services/notification.service", () => ({
    notificationService: {
        getNotifications: jest.fn(),
        acceptFollowRequest: jest.fn(),
        declineFollowRequest: jest.fn(),
    },
}));

describe("useNotifications hook", () => {
    let queryClient: QueryClient;

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
            },
        });
        jest.clearAllMocks();
    });

    it("fetches notifications successfully", async () => {
        const mockRequests = [
            {
                id: "req-1",
                type: "follow_request" as const,
                actor: { id: "user-1", username: "alice" },
                createdAt: "2026-09-03T18:00:00Z",
                isRead: false,
                status: "pending" as const,
            },
        ];

        (notificationService.getNotifications as jest.Mock).mockResolvedValueOnce({
            success: true,
            data: { followRequests: mockRequests },
        });

        const { result } = renderHook(() => useNotifications(), { wrapper });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.notifications).toHaveLength(1);
        expect(result.current.notifications[0].id).toBe("req-1");
    });

    it("handles acceptRequest mutation", async () => {
        const mockRequests = [
            {
                id: "req-1",
                type: "follow_request" as const,
                actor: { id: "user-1", username: "alice" },
                createdAt: "2026-09-03T18:00:00Z",
                isRead: false,
                status: "pending" as const,
            },
        ];

        (notificationService.getNotifications as jest.Mock).mockResolvedValue({
            success: true,
            data: { followRequests: mockRequests },
        });
        (notificationService.acceptFollowRequest as jest.Mock).mockResolvedValueOnce({
            success: true,
            data: { status: "accepted" },
        });

        const { result } = renderHook(() => useNotifications(), { wrapper });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        await act(async () => {
            await result.current.acceptRequest("req-1");
        });

        expect(notificationService.acceptFollowRequest).toHaveBeenCalledWith("req-1");
    });

    it("handles declineRequest mutation", async () => {
        const mockRequests = [
            {
                id: "req-2",
                type: "follow_request" as const,
                actor: { id: "user-2", username: "bob" },
                createdAt: "2026-09-03T18:00:00Z",
                isRead: false,
                status: "pending" as const,
            },
        ];

        (notificationService.getNotifications as jest.Mock).mockResolvedValue({
            success: true,
            data: { followRequests: mockRequests },
        });
        (notificationService.declineFollowRequest as jest.Mock).mockResolvedValueOnce({
            success: true,
            data: { status: "declined" },
        });

        const { result } = renderHook(() => useNotifications(), { wrapper });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        await act(async () => {
            await result.current.declineRequest("req-2");
        });

        expect(notificationService.declineFollowRequest).toHaveBeenCalledWith("req-2");
    });
});
