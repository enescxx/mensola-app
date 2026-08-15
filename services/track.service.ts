import { client } from "../api/client";
import { ApiResponse } from "../types";

const TrackService = {
    getTrackDetails: async (trackId: string): Promise<ApiResponse> => {
        return client.get<ApiResponse>(`/tracks/${trackId}`, {
            auth: true,
        });
    },

    likeTrack: async (trackId: string): Promise<ApiResponse> => {
        return client.post<ApiResponse>(
            `/tracks/${trackId}/like`,
            {},
            {
                auth: true,
            },
        );
    },

    unlikeTrack: async (trackId: string): Promise<ApiResponse> => {
        return client.delete<ApiResponse>(`/tracks/${trackId}/like`, {
            auth: true,
        });
    },

    createOrUpdateInteraction: async (
        trackId: string,
        data: { rating?: number; comment?: string; isLiked?: boolean },
    ): Promise<ApiResponse> => {
        return client.post<ApiResponse>(`/tracks/${trackId}/interactions`, data, {
            auth: true,
        });
    },
};

export { TrackService };
