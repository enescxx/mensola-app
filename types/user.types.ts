import { ApiResponse } from "./api";
import { PaginationResponse, UserId } from "./common.types";
import { FavoriteMovies } from "./movie.types";
import { StatTypeKey } from "./stat.types";
import { FavoriteTracks } from "./track.types";

export interface IUser {
    id: UserId;
    username: string;
    fullname?: string;
    avatar?: URL | string;
    bio?: string;
}
export type UserFavorites = { favoriteMovies: FavoriteMovies; favoriteTracks: FavoriteTracks };
export type UserStats = Record<StatTypeKey, number>;
export type UserProfile = IUser & UserStats & UserFavorites;
export type GetProfileRequest = { userId: UserId | "me" };
export type GetProfileResponse = ApiResponse<{ profile: UserProfile }>;
export type FollowActionResponseData = { userId: UserId; isFollowing: boolean };
export type FollowActionResponse = ApiResponse<FollowActionResponseData>;
export type FollowUsersResponseDataItem = IUser & { isFollowing: boolean; isFollower: boolean };
export type FollowUsersResponseData = PaginationResponse & { items: FollowUsersResponseDataItem[] };
export type FollowUsersResponse = ApiResponse<FollowUsersResponseData>;
