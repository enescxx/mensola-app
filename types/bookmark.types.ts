import { ApiResponse } from "./api";
import { BookmarkId, MovieListId, PaginationQueries, PlaylistId, UserId } from "./common.types";

export type BookmarkTargetType = "movieList" | "playlist";
export type BookmarkTargetId = MovieListId | PlaylistId;
export interface IBookmark {
    id: BookmarkId;
    userId: UserId;
    targetId: BookmarkTargetId;
    targetType: BookmarkTargetType;
    createdAt?: Date | string;
}
export type ToggleBookmarkRequest = Pick<IBookmark, "targetId" | "targetType">;
export type ToggleBookmarkResponse = ApiResponse<{ isSaved: boolean }>;
export type UserBookmarksRequest = PaginationQueries & { targetType?: BookmarkTargetType };
export type UserBookmarksResponse = ApiResponse<Omit<IBookmark, "userId">[]>;
