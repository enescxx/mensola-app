import { client } from "../api/client";

import { ApiResponse, GetProfileResponse, GetStatDetailsResponse } from "../types";

const STAT_ENDPOINT_MAP: Record<string, string> = {
    "movie-lists": "/movies/lists",
    playlists: "/playlists",
    watchlist: "/movies/watchlist",
    watched: "/movies/watched",
    "liked-movies": "/movies/likes",
    "liked-tracks": "/tracks/likes",
    "liked-playlists": "/playlists/likes",
    "liked-movie-lists": "/movies/lists/likes",
    "liked-albums": "/albums/likes",
    followers: "/users/followers",
    following: "/users/following",
    "favorite-movies": "/movies/favorites",
    "favorites-tracks": "/tracks/favorites",
};

const ProfileService = {
    getMe: async (): Promise<GetProfileResponse> => {
        return client.get<GetProfileResponse>("/users/me", {
            auth: true,
        });
    },

    getProfile: async (profileId: string): Promise<GetProfileResponse> => {
        return client.get<GetProfileResponse>(`/users/${profileId}`, {
            auth: true,
        });
    },

    getStatDetails: async (statType: string, userId?: string, page?: number, limit?: number): Promise<ApiResponse> => {
        return client.get<ApiResponse>(
            `${STAT_ENDPOINT_MAP[statType]}?${userId && "userId=" + userId}&${page && "page=" + page}&${limit && "limit=" + limit}`,
            { auth: true },
        );
    },
};

export { ProfileService };
