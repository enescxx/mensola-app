import { IAlbumDetails, IAlbumTrackItem, IAlbumInteractionItem } from "@/hooks/music/useAlbumDetails";

export { IAlbumDetails, IAlbumTrackItem, IAlbumInteractionItem };

export interface IAlbumHeroProps {
    albumDetails: IAlbumDetails | null;
    tracksCount: number;
    commentsCount?: number;
    toggleLike: () => void;
    onCommentPress?: () => void;
    onSharePress?: () => void;
    onPlayPress?: () => void;
}

export interface IAlbumDetailViewProps {
    albumDetails: IAlbumDetails | null;
    tracks: IAlbumTrackItem[];
    interactions: IAlbumInteractionItem[];
    isLoading: boolean;
    isRefetching: boolean;
    error: string;
    refetch: () => void;
    toggleLike: () => void;
    submitInteraction: (data: { rating?: number; comment?: string; isLiked?: boolean }) => Promise<void>;
}
