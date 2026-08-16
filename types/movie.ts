import { ApiResponse } from "./api";
import { IUser, IUserInteraction } from "./user";
import { IComment } from "./comment";

export interface IMovie {
    id: string;
    title: string;
    poster: string;
    releaseDate?: string;
    rating?: number;
    genres?: string[];
    duration?: number;
    description?: string;
}

export type GetMovieInteractionsItem = Pick<IUserInteraction, "id" | "isLiked" | "rating"> & {
    user: Pick<IUser, "id" | "username" | "fullname" | "avatar">;
    comment: Pick<IComment, "id" | "content"> & { date: IComment["createdAt"] };
};

export interface IMovieDetail extends IMovie {
    isWatched?: boolean;
    isInList?: boolean;
    isWatchlisted?: boolean;
    likesCount?: number;
    commentsCount?: number;
    interactions: GetMovieInteractionsItem[];
    currentUserInteraction: Omit<GetMovieInteractionsItem, "user">;
}

export type GetMovieResponse = ApiResponse<IMovieDetail>;

export interface IMovieList {
    id: string;
    title: string;
    description?: string;
    image?: string;
    creator: IUser;
    items?: IMovieListItem[];
    owner?: IUser[];
}

export interface IMovieListItem {
    id: string;
    title: string;
    poster: string;
    rating?: number;
    isLiked?: boolean;
    hasReview?: boolean;
}

export interface IMovieListOwner {
    id: string;
    username: string;
    fullname: string;
    avatar: string | null;
    isFollowing?: boolean;
    isFollower?: boolean;
}

export interface IMovieListDetails {
    id: string;
    title: string;
    description?: string;
    image?: string;
    isPrivate?: boolean;
    listType?: string;
    creatorId?: string;
    owners?: IMovieListOwner[];
    isLiked?: boolean;
    isSaved?: boolean;
    likesCount?: number;
    savesCount?: number;
    currentUserInteraction?: {
        id?: string;
        rating?: number;
        isLiked?: boolean;
        comment?: {
            id?: string;
            content?: string;
            date?: string;
        };
    } | null;
}

export interface IMovieListInteractionItem {
    id: string;
    rating?: number;
    isLiked?: boolean;
    user: {
        id: string;
        username: string;
        fullname?: string;
        avatar?: string;
    };
    comment: {
        id: string;
        content: string;
        date: string;
    };
    likeCount: number;
    replyCount: number;
}
