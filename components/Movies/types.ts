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

import { IMovieListOption } from "@/hooks/movie/useMovieLists";

interface IAddToListBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    movieId?: string;
    isWatchlisted?: boolean;
    onStatusChange?: (status: { isWatchlisted: boolean; isInList: boolean }) => void;
}

interface IAddToListSheetItemProps {
    item: IMovieListOption;
    onToggle: (
        id: string,
        isWatchlist: boolean,
        onStatusChange?: (status: { isWatchlisted: boolean; isInList: boolean }) => void
    ) => void;
    isLoading?: boolean;
    onStatusChange?: (status: { isWatchlisted: boolean; isInList: boolean }) => void;
}

export {
    IActionBtnProps,
    MovieDetailViewProps,
    MovieHeroProps,
    MovieOverviewProps,
    IAddToListBottomSheetProps,
    IAddToListSheetItemProps,
};
