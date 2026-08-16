import { useState, useCallback, useEffect } from "react";
import { TrackService } from "@/services/track.service";
import { useDetailBase } from "../shared/useDetailBase";
import { useInteracion } from "../shared/useInteraction";

export interface ITrackInteractionItem {
    id: string;
    rating?: number | string;
    isLiked?: boolean;
    user: {
        id: string;
        username: string;
        fullname?: string;
        avatar?: string;
    };
    comment: {
        id: string;
        content: string;
        date: string;
    };
    likeCount: number;
    replyCount: number;
}

export interface ITrackDetails {
    id: string;
    title: string;
    description?: string;
    image?: string;
    artists: {
        id: string;
        name: string;
        avatar?: string;
    }[];
    duration?: number;
    likesCount: number;
    commentsCount: number;
    isLiked?: boolean;
    currentUserInteraction?: {
        id?: string;
        rating?: number | null;
        isLiked?: boolean;
        comment?: {
            id?: string;
            content?: string;
            date?: string;
        } | null;
    } | null;
    interactions?: {
        id: string;
        user: {
            id: string;
            username: string;
            fullname: string;
            avatar?: string;
        };
        rating: number | null;
        isLiked: boolean;
        comment: {
            id: string;
            content: string;
            date: string;
        };
    }[];
}

export const useTrackDetails = (trackId?: string) => {
    const {
        details: trackDetails,
        setDetails,
        fetchData,
        ...rest
    } = useDetailBase<ITrackDetails>({
        id: trackId,
        fetcher: (id) => TrackService.getTrackDetails(id),
        onLike: (id) => TrackService.likeTrack(id),
        onUnlike: (id) => TrackService.unlikeTrack(id),
        getIsLiked: (d) => !!d.isLiked,
        getLikesCount: (d) => d.likesCount ?? 0,
        updateLike: (d, isLiked, count) => ({ ...d, isLiked, likesCount: count }),
    });

    const { submitInteraction } = useInteracion<ITrackInteractionItem>({
        targetId: trackId,
        createOrUpdateInteraction: async (id, data) => {
            await TrackService.createOrUpdateInteraction(id, data);
        },
    });

    const refetchAll = useCallback(async () => {
        await Promise.all([fetchData(true)]);
    }, [fetchData]);

    return { trackDetails, submitInteraction, refetchAll, ...rest };
};
