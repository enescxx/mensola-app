import { ApiResponse } from "./api";
import { IUser } from "./user";
import { IMovie, IMovieList } from "./movie";
import { ITrack, IPlaylist, IAlbum, IArtist } from "./music";

interface FavoriteMovieData extends Pick<IMovie, "id" | "title" | "poster"> {
    rating?: number;
    isLiked?: boolean;
    hasReview?: boolean;
}

interface ProfileData extends Pick<IUser, "id" | "fullname" | "username" | "bio" | "avatar" | "favoriteTracks"> {
    favoriteMovies: FavoriteMovieData[];
    movieListCount?: number;
    playlistCount?: number;
    watchlistMoviesCount?: number;
    watchedMoviesCount?: number;
    likedMoviesCount?: number;
    likedTracksCount?: number;
    likedPlaylistsCount?: number;
    likedMovieListsCount?: number;
    likedAbums?: number;
    followerCount?: number;
    followingCount?: number;
}

type GetProfileResponse = ApiResponse<ProfileData>;

type GetStatDetailsResponse = ApiResponse<{
    items: IMovie[] | ITrack[] | IPlaylist[] | IAlbum[] | IArtist[] | IUser[] | IMovieList[];
}>;

export { FavoriteMovieData, ProfileData, GetProfileResponse, GetStatDetailsResponse };
