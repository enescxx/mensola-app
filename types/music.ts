import { IUser } from "./user";

interface ITrack {
    id: string;
    title: string;
    image?: string;
    duration: number;
    artists: IArtist[];
    album?: IAlbum;
}

interface IPlaylistTrack {
    added_at: string;
    added_by: IUser;
    track: ITrack;
}

interface IPlaylist {
    id: string;
    title: string;
    description?: string;
    image?: string;
    creator?: IUser;
    songCount?: number;
    owners?: IUser[];
    items?: IPlaylistTrack[];
}

interface IAlbum {
    id: string;
    title: string;
    image?: string;
    artists: IArtist[];
    songCount?: number;
    releaseYear?: number;
    items?: ITrack[];
}

interface IArtist {
    id: string;
    name: string;
    image?: string;
    followers?: number;
}

export { ITrack, IPlaylistTrack, IPlaylist, IAlbum, IArtist };
