export interface IInteractionSheetProps {
    isVisible: boolean;
    onClose: () => void;
    targetType: "movie" | "track" | "playlist" | "album" | "movieList";
    targetId: string;
    mediaTitle: string;
    mediaTypeTitle?: string;
    mediaPoster?: string;
    initialRating?: number;
    initialComment?: string;
    initialIsLiked?: boolean;
    onSubmit?: (data: { rating: number; comment: string; isLiked: boolean }) => Promise<void> | void;
    isLoading?: boolean;
}
