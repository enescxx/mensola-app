import { MovieId, MovieListId } from "@/types/common.types";
import { client } from "../api/client";
import {
    InteractionsRequest,
    InteractionsResponse,
    UpsertInteractionRequest,
    UpsertInteractionResponse,
} from "@/types/interaction.types";
import {
    AddToListResponse,
    GetListsRequest,
    GetListsResponse,
    MarkAsWatchedResponse,
    MovieDetailsResponse,
    MovieLikeActionsResponse,
    MovieListDetailsResponse,
    MovieListItemsResponse,
    MovieListLikeActionsResponse,
} from "@/types/movie.types";
import { ApiResponse } from "@/types/api";
const MovieService = {
    getMovie: async (movieId: MovieId): Promise<MovieDetailsResponse> => {
        return client.get<MovieDetailsResponse>(`/v1/movies/${movieId}`, { auth: true });
    },

    markAsWatched: async (movieId: MovieId): Promise<MarkAsWatchedResponse> => {
        return client.post<MarkAsWatchedResponse>(`/v1/movies/${movieId}/watched`, {}, { auth: true });
    },

    unmarkAsWatched: async (movieId: MovieId): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/v1/movies/${movieId}/watched`, { auth: true });
    },

    likeMovie: async (movieId: MovieId): Promise<MovieLikeActionsResponse> => {
        return client.post<MovieLikeActionsResponse>(`/v1/movies/${movieId}/like`, {}, { auth: true });
    },

    unlikeMovie: async (movieId: MovieId): Promise<MovieLikeActionsResponse> => {
        return client.delete<MovieLikeActionsResponse>(`/v1/movies/${movieId}/like`, { auth: true });
    },

    addToWatchlist: async (movieId: MovieId): Promise<AddToListResponse> => {
        return client.post<AddToListResponse>(`/v1/movies/${movieId}/watchlist`, {}, { auth: true });
    },

    removeFromWatchlist: async (movieId: MovieId): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/v1/movies/${movieId}/watchlist`, { auth: true });
    },

    addMovieToList: async (listId: MovieListId, movieId: MovieId): Promise<AddToListResponse> => {
        return client.post<AddToListResponse>(`/v1/movies/lists/${listId}/items/${movieId}`, {}, { auth: true });
    },

    removeMovieFromList: async (listId: MovieListId, movieId: MovieId): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/v1/movies/lists/${listId}/items/${movieId}`, { auth: true });
    },

    getUserLists: async (data: GetListsRequest): Promise<GetListsResponse> => {
        const { movieId, page = 1, limit = 20 } = data;
        return client.get<GetListsResponse>(`/v1/movies/lists`, { auth: true, params: { movieId, page, limit } });
    },

    createOrUpdateInteraction: async (data: UpsertInteractionRequest): Promise<UpsertInteractionResponse> => {
        return client.post<UpsertInteractionResponse>(`/v1/movies/${data.targetId}/interaction`, data.interaction, {
            auth: true,
        });
    },

    getMovieListDetails: async (listId: MovieListId): Promise<MovieListDetailsResponse> => {
        return client.get<MovieListDetailsResponse>(`/v1/movies/lists/${listId}`, { auth: true });
    },

    getMovieListItems: async (listId: string, page = 1, limit = 18): Promise<MovieListItemsResponse> => {
        return client.get<MovieListItemsResponse>(`/v1/movies/lists/${listId}/items`, {
            auth: true,
            params: { page, limit },
        });
    },

    getMovieListInteractions: async (data: InteractionsRequest): Promise<InteractionsResponse> => {
        const { targetId, page = 1, limit = 15 } = data;
        return client.get<InteractionsResponse>(`/v1/movies/lists/${targetId}/interactions`, {
            auth: true,
            params: { page, limit },
        });
    },

    createOrUpdateListInteraction: async (data: UpsertInteractionRequest): Promise<UpsertInteractionResponse> => {
        return client.post<UpsertInteractionResponse>(
            `/v1/movies/lists/${data.targetId}/interaction`,
            data.interaction,
            { auth: true },
        );
    },

    likeMovieList: async (listId: MovieListId): Promise<MovieListLikeActionsResponse> => {
        return client.post<MovieListLikeActionsResponse>(`/v1/movies/lists/${listId}/like`, {}, { auth: true });
    },

    unlikeMovieList: async (listId: MovieListId): Promise<MovieListLikeActionsResponse> => {
        return client.delete<MovieListLikeActionsResponse>(`/v1/movies/lists/${listId}/like`, { auth: true });
    },
};

export { MovieService };
