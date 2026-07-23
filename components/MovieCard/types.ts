import { IUserInteraction } from "../../types";
import { StyleProp, ViewStyle } from "react-native";

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
    style?: StyleProp<ViewStyle>;
}

export { IMovieCardFooterProps, IMovieCardProps };
