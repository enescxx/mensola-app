import { AlbumDetails } from "@/types/album.types";
import { InteractionItemResponse, UpsertInteractionRequest } from "@/types/interaction.types";
import { ITrack } from "@/types/track.types";
import { UpsertInteractionSummary } from "@/types/interaction.types";

export interface IAlbumHeroProps {
    albumDetails: AlbumDetails | null;
    tracksCount: number;
    commentsCount?: number;
    toggleLike: () => void;
    onCommentPress?: () => void;
    onSharePress?: () => void;
    onPlayPress?: () => void;
}

export interface IAlbumDetailViewProps {
    albumDetails: AlbumDetails | null;
    tracks: ITrack[];
    loadMoreTracks: () => void;
    hasNextTrackPage: boolean;
    isFetchingNextTrackPage: boolean;
    interactions: InteractionItemResponse[];
    submitInteraction: (data: UpsertInteractionSummary) => Promise<void>;
    loadMoreInteractions: () => void;
    hasNextInteractionsPage: boolean;
    isFetchingNextInteractionPage: boolean;
    isLoading: boolean;
    isRefetching: boolean;
    error: string;
    refetchAll: () => void;
    toggleLike: () => void;
}
