import {
    IPlaylistDetails,
    IPlaylistTrackItem,
    IPlaylistOwner,
    IPlaylistInteractionItem,
} from "@/hooks/music/usePlaylistDetails";

export interface IPlaylistHeroProps {
    playlistDetails: IPlaylistDetails | null;
    tracksCount: number;
    commentsCount?: number;
    toggleLike: () => void;

    onCommentPress?: () => void;
    onSharePress?: () => void;
}

export interface IPlaylistDetailViewProps {
    playlistDetails: IPlaylistDetails | null;
    tracks: IPlaylistTrackItem[];
    loadMoreTracks: () => void;
    hasNextTrackPage: boolean;
    isFetchingNextTrackPage: boolean;
    interactions: IPlaylistInteractionItem[];
    submitInteraction: (data: { rating?: number; comment?: string; isLiked?: boolean }) => Promise<void>;
    loadMoreInteractions: () => void;
    hasNextInteractionsPage: boolean;
    isFetchingNextInteractionPage: boolean;
    isLoading: boolean;
    isRefetching: boolean;
    error: string;
    refetchAll: () => void;
    toggleLike: () => void;
}

export interface IPlaylistOwnersBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    owners: IPlaylistOwner[];
    creatorId?: string;
}
