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

    createOrUpdateInteraction: async (
        movieId: string,
        data: { rating?: number; comment?: string; isLiked?: boolean }
    ): Promise<ApiResponse> => {
        return client.post<ApiResponse>(`/movies/${movieId}/interaction`, data, {
            auth: true,
        });
    },

    getMovieListDetails: async (listId: string): Promise<ApiResponse> => {
        return client.get<ApiResponse>(`/movies/lists/${listId}`, {
            auth: true,
        });
    },

    getMovieListItems: async (listId: string, page = 1, limit = 18): Promise<ApiResponse> => {
        return client.get<ApiResponse>(`/movies/lists/${listId}/items?page=${page}&limit=${limit}`, {
            auth: true,
        });
    },

    getMovieListInteractions: async (listId: string, page = 1, limit = 18): Promise<ApiResponse> => {
        return client.get<ApiResponse>(`/movies/lists/${listId}/interactions?page=${page}&limit=${limit}`, {
            auth: true,
        });
    },

    createOrUpdateListInteraction: async (
        listId: string,
        data: { rating?: number; comment?: string; isLiked?: boolean }
    ): Promise<ApiResponse> => {
        return client.post<ApiResponse>(`/movies/lists/${listId}/interaction`, data, {
            auth: true,
        });
    },

    likeMovieList: async (listId: string): Promise<ApiResponse> => {
        return client.post<ApiResponse>(`/movies/lists/${listId}/like`, {}, {
            auth: true,
        });
    },

    unlikeMovieList: async (listId: string): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/movies/lists/${listId}/like`, {
            auth: true,
        });
    },
};

export { MovieService };


