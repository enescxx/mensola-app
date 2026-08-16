import { client } from "../api/client";
import { ApiResponse } from "../types";

export type BookmarkTargetType = "playlist" | "movieList";

export const BookmarkService = {
    toggleBookmark: async (
        targetId: string,
        targetType: BookmarkTargetType,
    ): Promise<ApiResponse<{ isSaved: boolean }>> => {
        return client.post<ApiResponse<{ isSaved: boolean }>>(
            "/bookmarks/toggle",
            { targetId, targetType },
            {
                auth: true,
            },
        );
    },

    getUserBookmarks: async (targetType?: BookmarkTargetType, page = 1, limit = 20): Promise<ApiResponse> => {
        const query = targetType
            ? `?targetType=${targetType}&page=${page}&limit=${limit}`
            : `?page=${page}&limit=${limit}`;
        return client.get<ApiResponse>(`/bookmarks${query}`, {
            auth: true,
        });
    },
};
