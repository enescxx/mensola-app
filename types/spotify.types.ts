import { IAlbum } from "./album.types";
import { ApiResponse } from "./api";
import { IArtist } from "./artist.types";
import { PaginationQueries, PaginationResponse } from "./common.types";
import { ITrack } from "./track.types";

export type SearchTrackRequest = PaginationQueries & { query: string };
export type SpotifyTrackItem = Omit<ITrack, "id"> & {
    album?: Pick<IAlbum, "spotifyId" | "title">;
    artists?: Pick<IArtist, "spotifyId" | "name">[];
};
export type SearchTrackResponseData = PaginationResponse & { items: SpotifyTrackItem[]; totalResults: number };
export type SearchTrackResponse = ApiResponse<SearchTrackResponseData>;
export type NewAlbumsItem = Omit<IAlbum, "id"> & { artists?: Pick<IArtist, "spotifyId" | "name">[] };
export type GetNewAlbumsData = PaginationResponse & { items: NewAlbumsItem[]; totalResults: number };
export type GetAlbumsResponse = ApiResponse<GetNewAlbumsData>;
