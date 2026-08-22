import { ApiResponse } from "./api";
import { PaginationQueries, PaginationResponse, TmdbId } from "./common.types";
import { IMovie } from "./movie.types";

export type SearchMovieRequest = Pick<PaginationQueries, "page"> & { query: string };
export type TmdbMovieItem = Omit<IMovie, "id"> & { tmdbId: TmdbId; rating: number };
export type TmdbMovieResponseData = Omit<PaginationResponse, "limit"> & {
    items: TmdbMovieItem[];
    totalResults: number;
};
export type TmdbhMoviesResponse = ApiResponse<TmdbMovieResponseData>;
