import { IMovieListDetails, IMovieListItem, IMovieListOwner, IMovieListInteractionItem } from "@/hooks/movie/useMovieListDetails";

export interface IMovieListHeroProps {
    listDetails: IMovieListDetails | null;
    moviesCount: number;
    commentsCount?: number;
    toggleLike: () => void;
    onCommentPress?: () => void;
}

export type IMovieListHeaderProps = IMovieListHeroProps;

export interface IMovieListDetailViewProps {
    listDetails: IMovieListDetails | null;
    movies: IMovieListItem[];
    interactions: IMovieListInteractionItem[];
    isLoading: boolean;
    isRefetching: boolean;
    error: string;
    refetch: () => void;
    toggleLike: () => void;
    submitInteraction: (data: { rating?: number; comment?: string; isLiked?: boolean }) => Promise<void>;
}

export interface IMovieListOwnersBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    owners: IMovieListOwner[];
    creatorId?: string;
}
