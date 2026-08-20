import { TrackId } from "@/types/common.types";
import { client } from "../api/client";
import { UpsertInteractionRequest, UpsertInteractionResponse } from "@/types/interaction.types";
import { TrackDetailsResponse, TrackLikeActionsResponse } from "@/types/track.types";

const TrackService = {
    getTrackDetails: async (trackId: TrackId): Promise<TrackDetailsResponse> => {
        return client.get<TrackDetailsResponse>(`/v1/tracks/${trackId}`, { auth: true });
    },

    likeTrack: async (trackId: TrackId): Promise<TrackLikeActionsResponse> => {
        return client.post<TrackLikeActionsResponse>(`/v1/tracks/${trackId}/like`, {}, { auth: true });
    },

    unlikeTrack: async (trackId: TrackId): Promise<TrackLikeActionsResponse> => {
        return client.delete<TrackLikeActionsResponse>(`/v1/tracks/${trackId}/like`, { auth: true });
    },

    createOrUpdateInteraction: async (data: UpsertInteractionRequest): Promise<UpsertInteractionResponse> => {
        return client.post<UpsertInteractionResponse>(`/v1/tracks/${data.targetId}/interactions`, data.interaction, {
            auth: true,
        });
    },
};

export { TrackService };
