import { useState, useCallback, useEffect } from "react";
import { TrackService } from "@/services/track.service";

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
    const [trackDetails, setTrackDetails] = useState<ITrackDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRefetching, setIsRefetching] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchData = useCallback(
        async (isRefreshing = false) => {
            if (!trackId) return;

            if (isRefreshing) {
                setIsRefetching(true);
            } else {
                setIsLoading(true);
            }
            setError("");

            try {
                const res = await TrackService.getTrackDetails(trackId);

                if (res.data) {
                    setTrackDetails(res.data);
                } else {
                    setError("Şarkı yüklenirken bir hata oluştu.");
                }
            } catch (err: any) {
                setError(err?.message || "Şarkı verileri yüklenirken bir hata oluştu.");
            } finally {
                setIsLoading(false);
                setIsRefetching(false);
            }
        },
        [trackId],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const toggleLike = async () => {
        if (!trackId || !trackDetails) return;

        const currentIsLiked = !!trackDetails.isLiked;
        const currentLikesCount = trackDetails.likesCount || 0;

        // Optimistic update
        setTrackDetails((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                isLiked: !currentIsLiked,
                likesCount: currentIsLiked ? currentLikesCount - 1 : currentLikesCount + 1,
            };
        });

        try {
            if (currentIsLiked) {
                await TrackService.unlikeTrack(trackId);
            } else {
                await TrackService.likeTrack(trackId);
            }
        } catch (err) {
            // Revert optimistic update
            setTrackDetails((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    isLiked: currentIsLiked,
                    likesCount: currentLikesCount,
                };
            });
            console.error("Şarkı beğenme/beğenmekten vazgeçme hatası:", err);
        }
    };

    const submitInteraction = async (data: { rating?: number; comment?: string; isLiked?: boolean }) => {
        if (!trackId || !trackDetails) return;

        const prevInteraction = trackDetails.currentUserInteraction;

        // Optimistic update
        setTrackDetails((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                currentUserInteraction: {
                    ...prev.currentUserInteraction,
                    rating: data.rating,
                    isLiked: data.isLiked ?? prev.currentUserInteraction?.isLiked,
                    comment: {
                        content: data.comment,
                    },
                },
            };
        });

        try {
            await TrackService.createOrUpdateInteraction(trackId, data);
        } catch (err) {
            // Revert optimistic update
            setTrackDetails((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    currentUserInteraction: prevInteraction,
                };
            });
            console.error("Etkileşim gönderme hatası:", err);
            throw err;
        }
    };

    return {
        trackDetails,
        isLoading,
        isRefetching,
        error,
        refetch: () => fetchData(true),
        toggleLike,
        submitInteraction,
    };
};
