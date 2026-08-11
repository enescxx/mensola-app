import { ApiResponse } from "./api";
import { IUser, IUserInteraction } from "./user";
import { IComment } from "./comment";

interface IMovie {
    id: string;
    title: string;
    poster: string;
    releaseDate?: string;
    rating?: number;
    genres?: string[];
    duration?: number;
    description?: string;
}

type GetMovieInteractionsItem = Pick<IUserInteraction, "id" | "isLiked" | "rating"> & {
    user: Pick<IUser, "id" | "username" | "fullname" | "avatar">;
    comment: Pick<IComment, "id" | "content"> & { date: IComment["createdAt"] };
};

interface IMovieDetail extends IMovie {
    interactions: GetMovieInteractionsItem[];
    currentUserInteraction: Omit<GetMovieInteractionsItem, "user">;
}

type GetMovieResponse = ApiResponse<IMovieDetail>;

interface IMovieListItem {
    added_at: string;
    added_by: IUser;
    movie: IMovie;
}

interface IMovieList {
    id: string;
    title: string;
    description?: string;
    image?: string;
    creator: IUser;
    items?: IMovieListItem[];
    owner?: IUser[];
}

export { IMovie, IMovieDetail, GetMovieInteractionsItem, IMovieListItem, IMovieList, GetMovieResponse };
