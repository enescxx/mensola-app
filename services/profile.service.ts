import { client } from "../api/client";

import { GetProfileResponse, GetStatDetailsResponse } from "../types";

const STAT_ENDPOINT_MAP: Record<string, string> = {
    "movie-lists": "/movies/lists",
    playlists: "/playlists",
    watchlist: "/movies/watchlists",
    watched: "/mmovies/watched",
    "liked-movies": "/movies/liked",
    "liked-tracks": "/tracks/liked",
    "liked-playlists": "/playlists/liked",
    "liked-movie-lists": "/movies/lists/liked",
    "liked-albums": "/albums/liked",
    followers: "/users/followers",
    following: "/users/following",
    "favorite-movies": "/movies/favorites",
    "favorites-tracks": "/tracks/favorites"
};

const ProfileService = {
    getMe: async (): Promise<GetProfileResponse> => {
        return client.get<GetProfileResponse>("/users/me", {
            auth: true
        });
    },

    getProfile: async (profileId: string): Promise<GetProfileResponse> => {
        return client.get<GetProfileResponse>(`/users/${profileId}`, {
            auth: true
        });
    },

    getStatDetails: async (
        statType: string,
        userId?: string
    ): Promise<GetStatDetailsResponse> => {
        return client.get<GetStatDetailsResponse>(STAT_ENDPOINT_MAP[statType], {
            params: userId ? { userId } : {}
        });
    }
};

export { ProfileService };
