import { ApiResponse } from "./api";
import { IArtist } from "./artist.types";
import { AlbumId, PaginationQueries, PaginationResponse, SpotifyAlbumId, UserId } from "./common.types";
import { InteractionItemResponse, InteractionSummary } from "./interaction.types";
import { ITrack } from "./track.types";

export interface IAlbum {
    id: AlbumId;
    spotifyId?: SpotifyAlbumId;
    title: string;
    image?: URL | string;
    releaseYear?: number;
    songCount?: number;
    artists?: IArtist[];
}
export type AlbumDetails = IAlbum & {
    likesCount?: number;
    commentsCount: number;
    isLiked: boolean;
    interactions?: InteractionItemResponse[];
    currentUserInteraction?: InteractionSummary;
};
export type LikedAlbumsRequest = PaginationQueries & { userId: UserId };
export type AlbumTracksRequest = PaginationQueries & { albumId: AlbumId };
export type LikedAlbumsResponseDataItem = IAlbum & { isLiked?: boolean };
export type LikedAlbumsResponseData = PaginationResponse & { items: LikedAlbumsResponseDataItem[] };
export type LikedAlbumsResponse = ApiResponse<LikedAlbumsResponseData>;
export type AlbumDetailsResponse = ApiResponse<AlbumDetails>;
export type AlbumTracksResponseDataItem = ITrack & { isLiked?: boolean };
export type AlbumTracksResponseData = PaginationResponse & { items: AlbumTracksResponseDataItem[] };
export type AlbumTracksResponse = ApiResponse<AlbumTracksResponseData>;
export type AlbumLikeActionsResponseData = { albumId: AlbumId; isLiked: boolean };
export type AlbumLikeActionsResponse = ApiResponse<AlbumLikeActionsResponseData>;
