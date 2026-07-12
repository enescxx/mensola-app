import { IUser } from "./user";

interface IMovie {
    id: string;
    title: string;
    poster: string;
    releaseDate?: string;
    rating?: number;
    genres?: string[];
    duration?: number;
}

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

export { IMovie, IMovieListItem, IMovieList };
