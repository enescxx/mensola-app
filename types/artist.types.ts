import { ArtistId, SpotifyArtistId } from "./common.types";

export interface IArtist {
    id: ArtistId;
    spotifyId?: SpotifyArtistId;
    name: string;
    avatar?: URL | string;
    followerCount?: number;
}
