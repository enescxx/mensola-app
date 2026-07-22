import { IMovie } from "./movie";
import { ITrack, IArtist, IPlaylist, IMovieList } from "./music";
import { IComment } from "./comment";

type StatTypes =
    | "movieListCount"
    | "playlistCount"
    | "watchlistMoviesCount"
    | "watchedMoviesCount"
    | "likedMoviesCount"
    | "likedTracksCount"
    | "likedPlaylistsCount"
    | "likedMovieListsCount"
    | "likedAlbumsCount"
    | "followerCount"
    | "followingCount";

interface IUserStatItem {
    type: StatTypes;
    value: number;
}

type InteractionTypes =
    | "movie"
    | "tv"
    | "song"
    | "album"
    | "playlist"
    | "movieList";

interface IUserInteraction {
    id: string;
    userId: string;
    targetId: string;
    targetType: InteractionTypes;
    targetDetail?: IMovie | ITrack | IAlbum | IPlaylist | IMovieList;
    isLiked?: boolean;
    rating?: number;
    comment?: IComment;
    interactedAt: string;
}

interface IUser {
    id: string;
    username: string;
    fullname?: string;
    avatar?: string;
    bio?: string;
    stats?: IUserStatItem[];
    favoriteMovies?: IMovie[];
    favoriteTracks?: ITrack[];
    interactions?: IUserInteraction[];
}

export { StatTypes, IUserStatItem, InteractionTypes, IUserInteraction, IUser };
