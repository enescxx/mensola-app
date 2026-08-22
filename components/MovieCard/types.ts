import { StyleProp, ViewStyle } from "react-native";

export interface IMovieCardInteractions {
    rating?: number;
    isLiked?: boolean;
    hasReview?: boolean;
    totalLikes?: number;
    totalReviews?: number;
}

export interface IMovieCardFooterProps {
    interactions: IMovieCardInteractions;
    variant: "profile" | "feed";
    layout?: "horizontal" | "vertical";
}

export interface IMovieCardProps {
    title: string;
    poster: string;
    interactions?: IMovieCardInteractions;
    variant?: "profile" | "feed";
    layout?: "horizontal" | "vertical";
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    releaseDate?: string;
    genres?: string[];
    ratingAverage?: number;
}
