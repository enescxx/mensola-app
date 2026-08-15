import { ITrackDetails } from "@/hooks/music/useTrackDetails";

export { ITrackDetails };

export interface ITrackHeroProps {
    trackDetails: ITrackDetails | null;
    toggleLike: () => void;
    onCommentPress?: () => void;
    onAddPress?: () => void;
    onPlayPress?: () => void;
}

export interface ITrackDetailViewProps {
    trackDetails: ITrackDetails | null;
    isLoading: boolean;
    error: string;
    refetch: () => void;
    toggleLike: () => void;
    submitInteraction: (data: { rating?: number; comment?: string; isLiked?: boolean }) => Promise<void>;
}
