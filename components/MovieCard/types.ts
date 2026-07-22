import { IUserInteraction } from "../../types";

interface IMovieCardInteractions {
    rating?: number;
    isLiked?: boolean;
    hasReview?: boolean;
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
