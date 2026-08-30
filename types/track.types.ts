import { IAlbum } from "./album.types";
import { ApiResponse } from "./api";
import { IArtist } from "./artist.types";
import { AlbumId, PaginationResponse, SpotifyTrackId, TrackId } from "./common.types";
import { InteractionItemResponse, InteractionSummary } from "./interaction.types";

export interface ITrack {
    id: TrackId;
    spotifyId?: SpotifyTrackId;
    title: string;
    image?: URL | string;
    duration: number;
    albumId?: AlbumId;
    album?: Omit<IAlbum, "id"> | IAlbum;
    artists?: IArtist[];
}
export type TrackDetails = ITrack & {
    isLiked?: boolean;
    likesCount?: number;
    commentsCount?: number;
    isFavorite?: boolean;
    interactions?: InteractionItemResponse[];
    currentUserInteraction?: InteractionSummary;
};
export type TrackDetailsResponse = ApiResponse<TrackDetails>;
export type TrackLikeActionsResponseData = { trackId: TrackId; isLiked: boolean };
export type TrackLikeActionsResponse = ApiResponse<TrackLikeActionsResponseData>;
export type FavoriteTracks = ITrack[];
export type FavoriteTracksResponseData = PaginationResponse & { items: FavoriteTracks };
export type FavoriteTracksResponse = ApiResponse<FavoriteTracksResponseData>;
