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
    toggleSave?: () => void;
    onCommentPress?: () => void;
    onSharePress?: () => void;
}

export interface IPlaylistDetailViewProps {
    playlistDetails: IPlaylistDetails | null;
    tracks: IPlaylistTrackItem[];
    interactions: IPlaylistInteractionItem[];
    isLoading: boolean;
    isRefetching: boolean;
    error: string;
    refetch: () => void;
    toggleLike: () => void;
    toggleSave?: () => void;
    submitInteraction: (data: { rating?: number; comment?: string; isLiked?: boolean }) => Promise<void>;
}

export interface IPlaylistOwnersBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    owners: IPlaylistOwner[];
    creatorId?: string;
}
