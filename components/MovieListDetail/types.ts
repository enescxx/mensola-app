import { IMovieListDetails, IMovieListOwner, IMovieListInteractionItem } from "@/hooks/movie/useMovieListDetails";
import { IMovieListItem } from "@/types";

export interface IMovieListHeroProps {
    listDetails: IMovieListDetails | null;
    moviesCount: number;
    commentsCount?: number;
    toggleLike: () => void;
    toggleSave?: () => void;
    onCommentPress?: () => void;
    onSharePress?: () => void;
}

export type IMovieListHeaderProps = IMovieListHeroProps;

export interface IMovieListDetailViewProps {
    listDetails: IMovieListDetails | null;
    movies: IMovieListItem[];
    loadMoreMovies: () => void;
    hasNextMoviePage: boolean;
    isFetchingNextMoviePage: boolean;
    interactions: IMovieListInteractionItem[];
    isLoading: boolean;
    isRefetching: boolean;
    error: string;
    refetchAll: () => void;
    loadMoreInteraction: () => void;
    hasNextInteractionsPage?: boolean;
    isFetchingNextInteractionPage?: boolean;
    toggleLike: () => void;
    toggleSave?: () => void;
    submitInteraction: (data: { rating?: number; comment?: string; isLiked?: boolean }) => Promise<void>;
}

export interface IMovieListOwnersBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    owners: IMovieListOwner[];
    creatorId?: string;
}
