import { ApiResponse } from "./api";
import { IUser } from "./user";
import { IMovie } from "./movie";
import { ITrack, IPlaylist, IAlbum, IArtist } from "./music";

interface FavoriteMovieData extends Pick<IMovie, "id" | "title" | "poster"> {
    rating?: number;
    isLiked?: boolean;
    hasReview?: boolean;
}

interface ProfileData extends Pick<
    IUser,
    "id" | "fullname" | "username" | "bio" | "avatar" | "favoriteTracks"
> {
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
type GetStatDetailsResponse =
    | IMovie[]
    | ITrack[]
    | IPlaylist[]
    | IAlbum[]
    | IArtist[]
    | IUser[];

export {
    FavoriteMovieData,
    ProfileData,
    GetProfileResponse,
    GetStatDetailsResponse
};
