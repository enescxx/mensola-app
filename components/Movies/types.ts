import { Ionicons } from "@expo/vector-icons";
import { IMovieDetail } from "../../types";

interface IActionBtnProps {
    icon: keyof typeof Ionicons.glyphMap;
    isActive: boolean;
    activeColor: string;
    onPress?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
}

interface MovieDetailViewProps {
    movie: IMovieDetail | null;
    isLoading: boolean;
    error: string;
}

interface MovieHeroProps {
    movie: IMovieDetail | null;
    isLoading: boolean;
    error: string;
}

interface MovieOverviewProps {
    movie: IMovieDetail | null;
}

export { IActionBtnProps, MovieDetailViewProps, MovieHeroProps, MovieOverviewProps };
