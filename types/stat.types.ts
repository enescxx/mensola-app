import { LikedAlbumsResponse, LikedAlbumsResponseDataItem } from "./album.types";
import { PaginationQueries, UserId } from "./common.types";
import {
    GetListsResponse,
    GetListsResponseDataItem,
    IMovie,
    MovieListItemsResponse,
    MovieSummaryViaInteraction,
} from "./movie.types";
import {
    GetPlaylistsResponse,
    GetPlaylistsResponseDataItem,
    PlaylistItemsResponse,
    PlaylistItemsResponseDataItem,
} from "./playlist.types";
import { ITrack } from "./track.types";
import { FollowUsersResponse, FollowUsersResponseDataItem } from "./user.types";

export type StatType =
    | "movie-lists"
    | "playlists"
    | "watchlist"
    | "watched"
    | "liked-movies"
    | "liked-tracks"
    | "liked-playlists"
    | "liked-movie-lists"
    | "liked-albums"
    | "followers"
    | "following";
export type StatItem = { type: StatType; value: number };
export type StatTypeKey =
    | "movieListCount"
    | "playlistCount"
    | "watchlistMoviesCount"
    | "watchedMoviesCount"
    | "likedMoviesCount"
    | "likedTracksCount"
    | "likedPlaylistsCount"
    | "likedMovieListsCount"
    | "likedAlbumsCount"
    | "followersCount"
    | "followingCount";
export type GetStatDetailsRequest<T extends StatType = StatType> = PaginationQueries & {
    statType: T;
    userId?: UserId;
};
export type StatDetailsResponse<T extends StatType> = StatDetailsResponseMap[T];
export type StatDetailsResponseMap = {
    "movie-lists": GetListsResponse;
    playlists: GetPlaylistsResponse;
    watchlist: MovieListItemsResponse;
    watched: MovieListItemsResponse;
    "liked-movies": MovieListItemsResponse;
    "liked-tracks": PlaylistItemsResponse;
    "liked-playlists": GetPlaylistsResponse;
    "liked-movie-lists": GetListsResponse;
    "liked-albums": LikedAlbumsResponse;
    followers: FollowUsersResponse;
    following: FollowUsersResponse;
};
export type StatDetailsItemMap = {
    "movie-lists": GetListsResponseDataItem;
    playlists: GetPlaylistsResponseDataItem;
    watchlist: MovieSummaryViaInteraction;
    watched: MovieSummaryViaInteraction;
    "liked-movies": MovieSummaryViaInteraction;
    "liked-tracks": PlaylistItemsResponseDataItem;
    "liked-playlists": GetPlaylistsResponseDataItem;
    "liked-movie-lists": GetListsResponseDataItem;
    "liked-albums": LikedAlbumsResponseDataItem;
    followers: FollowUsersResponseDataItem;
    following: FollowUsersResponseDataItem;
};

export const STAT_KEY_MAP: Record<StatType, StatTypeKey | undefined> = {
    "movie-lists": "movieListCount",
    playlists: "playlistCount",
    watchlist: "watchlistMoviesCount",
    watched: "watchedMoviesCount",
    "liked-movies": "likedMoviesCount",
    "liked-tracks": "likedTracksCount",
    "liked-playlists": "likedPlaylistsCount",
    "liked-movie-lists": "likedMovieListsCount",
    "liked-albums": "likedAlbumsCount",
    followers: "followersCount",
    following: "followingCount",
};
export const STAT_ROUTE_MAP: Record<StatTypeKey, StatType> = {
    movieListCount: "movie-lists",
    playlistCount: "playlists",
    watchlistMoviesCount: "watchlist",
    watchedMoviesCount: "watched",
    likedMoviesCount: "liked-movies",
    likedTracksCount: "liked-tracks",
    likedPlaylistsCount: "liked-playlists",
    likedMovieListsCount: "liked-movie-lists",
    likedAlbumsCount: "liked-albums",
    followersCount: "followers",
    followingCount: "following",
};
export const STAT_ENDPOINT_MAP: Record<StatType, string> = {
    "movie-lists": "/movies/lists",
    playlists: "/playlists",
    watchlist: "/movies/watchlist",
    watched: "/movies/watched",
    "liked-movies": "/movies/likes",
    "liked-tracks": "/tracks/likes",
    "liked-playlists": "/playlists/likes",
    "liked-movie-lists": "/movies/lists/likes",
    "liked-albums": "/albums/likes",
    followers: "/users/followers",
    following: "/users/following",
};
export const STAT_KEY_ENDPOINT_MAP: Record<StatTypeKey, string> = {
    movieListCount: "/movies/lists",
    playlistCount: "/playlists",
    watchlistMoviesCount: "/movies/watchlist",
    watchedMoviesCount: "/movies/watched",
    likedMoviesCount: "/movies/likes",
    likedTracksCount: "/tracks/likes",
    likedPlaylistsCount: "/playlists/likes",
    likedMovieListsCount: "/movies/lists/likes",
    likedAlbumsCount: "/albums/likes",
    followersCount: "/users/followers",
    followingCount: "/users/following",
};
export const getStatLabels = (t: (key: string) => string): Record<StatTypeKey, string> => {
    return {
        movieListCount: t("stats.movieListCount"),
        playlistCount: t("stats.playlistCount"),
        watchlistMoviesCount: t("stats.watchlistMoviesCount"),
        watchedMoviesCount: t("stats.watchedMoviesCount"),
        likedMoviesCount: t("stats.likedMoviesCount"),
        likedTracksCount: t("stats.likedTracksCount"),
        likedPlaylistsCount: t("stats.likedPlaylistsCount"),
        likedMovieListsCount: t("stats.likedMovieListsCount"),
        likedAlbumsCount: t("stats.likedAlbumsCount"),
        followersCount: t("stats.followersCount"),
        followingCount: t("stats.followingCount"),
    };
};

/** @deprecated use getStatLabels() instead */
export const StatLabels: Record<StatTypeKey, string> = {
    movieListCount: "Oluşturulan Film Listeleri",
    playlistCount: "Oluşturulan Playlistler",
    watchlistMoviesCount: "İzleme Listesi",
    watchedMoviesCount: "İzlendi",
    likedMoviesCount: "Beğenilen Filmler",
    likedTracksCount: "Beğenilen Şarkılar",
    likedPlaylistsCount: "Beğenilen Playlistler",
    likedMovieListsCount: "Beğenilen Film Listeleri",
    likedAlbumsCount: "Beğenilen Albümler",
    followersCount: "Takipçi",
    followingCount: "Takip",
};
