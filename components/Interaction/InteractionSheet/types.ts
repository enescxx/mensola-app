import { InteractionTargetId, InteractionTargetTypes, UpsertInteractionSummary } from "@/types/interaction.types";

export interface IInteractionSheetProps {
    isVisible: boolean;
    onClose: () => void;
    targetType: InteractionTargetTypes;
    targetId: InteractionTargetId;
    mediaTitle: string;
    mediaTypeTitle?: string;
    mediaPoster?: URL | string;
    initialRating?: number;
    initialComment?: string;
    initialIsLiked?: boolean;
    onSubmit?: (data: UpsertInteractionSummary) => Promise<void> | void;
    isLoading?: boolean;
}
