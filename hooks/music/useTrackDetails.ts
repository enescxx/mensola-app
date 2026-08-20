import { useCallback } from "react";
import { TrackService } from "@/services/track.service";
import { useDetailBase } from "../shared/useDetailBase";
import { useInteracion } from "../shared/useInteraction";
import { TrackId } from "@/types/common.types";
import { TrackDetails } from "@/types/track.types";

export const useTrackDetails = (trackId?: TrackId) => {
    const {
        details: trackDetails,
        setDetails,
        fetchData,
        ...rest
    } = useDetailBase<TrackDetails, TrackId>({
        id: trackId,
        fetcher: (id) => TrackService.getTrackDetails(id),
        onLike: (id) => TrackService.likeTrack(id),
        onUnlike: (id) => TrackService.unlikeTrack(id),
        getIsLiked: (d) => !!d.isLiked,
        getLikesCount: (d) => d.likesCount ?? 0,
        updateLike: (d, isLiked, count) => ({ ...d, isLiked, likesCount: count }),
    });

    const { submitInteraction } = useInteracion({
        targetId: trackId,
        createOrUpdateInteraction: async (data) => {
            await TrackService.createOrUpdateInteraction(data);
        },
    });

    const refetchAll = useCallback(async () => {
        await Promise.all([fetchData(true)]);
    }, [fetchData]);

    return { trackDetails, submitInteraction, refetchAll, ...rest };
};
