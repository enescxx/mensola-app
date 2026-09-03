import { Ionicons } from "@expo/vector-icons";
import { IMovieListOption } from "@/hooks/movie/useMovieLists";
import { MovieId, MovieListId } from "@/types/common.types";
import { MovieDetails } from "@/types/movie.types";

export interface IActionBtnProps {
    icon: keyof typeof Ionicons.glyphMap;
    isActive: boolean;
    activeColor: string;
    onPress?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
}

export interface MovieDetailViewProps {
    movie: MovieDetails | null;
    isLoading: boolean;
    error: string;
}

export interface MovieHeroProps {
    movie: MovieDetails | null;
    isLoading: boolean;
    error: string;
    isInteractionSheetOpen?: boolean;
    onInteractionSheetOpenChange?: (open: boolean) => void;
}

export interface MovieOverviewProps {
    movie: MovieDetails | null;
}

export interface IAddToListBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    movieId?: MovieId;
    isWatchlisted?: boolean;
    onStatusChange?: (status: { isWatchlisted: boolean; isInList: boolean }) => void;
}

export interface IAddToListSheetItemProps {
    item: IMovieListOption;
    onToggle: (
        id: MovieListId,
        isWatchlist: boolean,
        onStatusChange?: (status: { isWatchlisted: boolean; isInList: boolean }) => void,
    ) => void;
    isLoading?: boolean;
    onStatusChange?: (status: { isWatchlisted: boolean; isInList: boolean }) => void;
}
