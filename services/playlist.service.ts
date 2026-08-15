import { client } from "../api/client";
import { ApiResponse } from "../types";

const PlaylistService = {
    getPlaylistDetails: async (playlistId: string): Promise<ApiResponse> => {
        return client.get<ApiResponse>(`/playlists/${playlistId}`, {
            auth: true,
        });
    },

    getPlaylistItems: async (playlistId: string, page = 1, limit = 30): Promise<ApiResponse> => {
        return client.get<ApiResponse>(`/playlists/${playlistId}/items?page=${page}&limit=${limit}`, {
            auth: true,
        });
    },

    getPlaylistInteractions: async (playlistId: string, page = 1, limit = 30): Promise<ApiResponse> => {
        return client.get<ApiResponse>(`/playlists/${playlistId}/interactions?page=${page}&limit=${limit}`, {
            auth: true,
        });
    },

    likePlaylist: async (playlistId: string): Promise<ApiResponse> => {
        return client.post<ApiResponse>(
            `/playlists/${playlistId}/like`,
            {},
            {
                auth: true,
            },
        );
    },

    unlikePlaylist: async (playlistId: string): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/playlists/${playlistId}/like`, {
            auth: true,
        });
    },

    createOrUpdateInteraction: async (
        playlistId: string,
        data: { rating?: number; comment?: string; isLiked?: boolean },
    ): Promise<ApiResponse> => {
        return client.post<ApiResponse>(`/playlists/${playlistId}/interactions`, data, {
            auth: true,
        });
    },

    getUserPlaylists: async (trackId?: string): Promise<ApiResponse> => {
        const url = trackId ? `/playlists?trackId=${trackId}` : "/playlists";
        return client.get<ApiResponse>(url, {
            auth: true,
        });
    },

    addTrackToPlaylist: async (playlistId: string, trackId: string): Promise<ApiResponse> => {
        return client.post<ApiResponse>(`/playlists/${playlistId}/items/${trackId}`, {}, {
            auth: true,
        });
    },

    removeTrackFromPlaylist: async (playlistId: string, trackId: string): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/playlists/${playlistId}/items/${trackId}`, {
            auth: true,
        });
    },
};

export { PlaylistService };
