import { client } from "../api/client";
import { ApiResponse } from "../types";

const AlbumService = {
    getLikedAlbums: async (userId?: string, page = 1, limit = 18): Promise<ApiResponse> => {
        const queryParams = new URLSearchParams();
        if (userId) queryParams.append("userId", userId);
        queryParams.append("page", page.toString());
        queryParams.append("limit", limit.toString());

        return client.get<ApiResponse>(`/albums/likes?${queryParams.toString()}`, {
            auth: true,
        });
    },

    getAlbumDetails: async (albumId: string): Promise<ApiResponse> => {
        return client.get<ApiResponse>(`/albums/${albumId}`, {
            auth: true,
        });
    },

    getAlbumTracks: async (albumId: string, page = 1, limit = 30): Promise<ApiResponse> => {
        return client.get<ApiResponse>(`/albums/${albumId}/tracks?page=${page}&limit=${limit}`, {
            auth: true,
        });
    },

    getAlbumInteractions: async (albumId: string, page = 1, limit = 30): Promise<ApiResponse> => {
        return client.get<ApiResponse>(`/albums/${albumId}/interactions?page=${page}&limit=${limit}`, {
            auth: true,
        });
    },

    likeAlbum: async (albumId: string): Promise<ApiResponse> => {
        return client.post<ApiResponse>(
            `/albums/${albumId}/like`,
            {},
            {
                auth: true,
            },
        );
    },

    unlikeAlbum: async (albumId: string): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/albums/${albumId}/like`, {
            auth: true,
        });
    },

    createOrUpdateInteraction: async (
        albumId: string,
        data: { rating?: number; comment?: string; isLiked?: boolean },
    ): Promise<ApiResponse> => {
        return client.post<ApiResponse>(`/albums/${albumId}/interactions`, data, {
            auth: true,
        });
    },
};

export { AlbumService };
