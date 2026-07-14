import { IUserInteraction } from "../../types";

interface IMovieCardInteractions extends Pick<
    IUserInteraction,
    "rating" | "isLiked" | "comment"
> {
    totalLikes?: number;
    totalReviews?: number;
}

interface IMovieCardFooterProps {
    interactions: IMovieCardInteractions;
    variant: "profile" | "feed";
}

interface IMovieCardProps {
    title: string;
    poster: string;
    interactions?: IMovieCardInteractions;
    variant?: "profile" | "feed";
}

export { IMovieCardFooterProps, IMovieCardProps };
