import { client } from "../api/client";
import { ApiResponse, GetMovieResponse } from "../types";

const MovieService = {
    getMovie: async (movieId: string): Promise<GetMovieResponse> => {
        return client.get<GetMovieResponse>(`/movies/${movieId}`, {
            auth: true,
        });
    },

    markAsWatched: async (movieId: string): Promise<ApiResponse> => {
        return client.post<ApiResponse>(`/movies/${movieId}/watched`, {}, {
            auth: true,
        });
    },

    unmarkAsWatched: async (movieId: string): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/movies/${movieId}/watched`, {
            auth: true,
        });
    },

    likeMovie: async (movieId: string): Promise<ApiResponse> => {
        return client.post<ApiResponse>(`/movies/${movieId}/like`, {}, {
            auth: true,
        });
    },

    unlikeMovie: async (movieId: string): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/movies/${movieId}/like`, {
            auth: true,
        });
    },

    addToWatchlist: async (movieId: string): Promise<ApiResponse> => {
        return client.post<ApiResponse>(`/movies/${movieId}/watchlist`, {}, {
            auth: true,
        });
    },

    removeFromWatchlist: async (movieId: string): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/movies/${movieId}/watchlist`, {
            auth: true,
        });
    },

    addMovieToList: async (listId: string, movieId: string): Promise<ApiResponse> => {
        return client.post<ApiResponse>(`/movies/lists/${listId}/items/${movieId}`, {}, {
            auth: true,
        });
    },

    removeMovieFromList: async (listId: string, movieId: string): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/movies/lists/${listId}/items/${movieId}`, {
            auth: true,
        });
    },

    getUserLists: async (movieId?: string, page = 1, limit = 20): Promise<ApiResponse> => {
        const query = movieId ? `?movieId=${movieId}&page=${page}&limit=${limit}` : `?page=${page}&limit=${limit}`;
        return client.get<ApiResponse>(`/movies/lists${query}`, {
            auth: true,
        });
    },
};

export { MovieService };

