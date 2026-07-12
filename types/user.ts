import { IMovie } from "./movie";
import { ITrack, IArtist, IPlaylist, IMovieList } from "./music";
import { IComment } from "./comment";

interface IUserStats {
    moviesWatched?: number;
    moviesWatchlist?: number;
    songsLiked?: number;
    followersCount?: number;
    followingCount?: number;
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
    profilePicture?: string;
    bio?: string;
    stats?: IUserStats;
    favoriteMovies?: IMovie[];
    favoriteTracks?: ITrack[];
    interactions?: IUserInteraction[];
}

export { IUserStats, InteractionTypes, IUserInteraction, IUser };
