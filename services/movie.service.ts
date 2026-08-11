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
};

export { MovieService };

