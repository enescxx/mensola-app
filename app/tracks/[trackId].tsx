import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Alert } from "react-native";
import { TrackDetailView } from "@/components/TrackDetail";
import { useTrackDetails } from "@/hooks/music/useTrackDetails";
import { SpotifyId, TrackId } from "@/types/common.types";
import { useFavoriteTracks } from "@/hooks/track/useFavoriteTracks";
import { Colors } from "@/constants/colors";
import ReplaceFavoriteBottomSheet from "@/components/ReplaceFavoriteBottomSheet";

export default function TrackDetailScreen() {
    const { trackId, type } = useLocalSearchParams<{
        trackId: string;
        type?: "spotify" | "app";
    }>();

    const { trackDetails, isLoading, error, refetchAll, toggleLike, submitInteraction } = useTrackDetails(
        type === "spotify" ? (trackId as SpotifyId) : (trackId as TrackId),
        type ?? "app",
    );
    const { addFavorite, removeFavorite, isLoading: isFavoriteLoading } = useFavoriteTracks();

    const [isFavorite, setIsFavorite] = useState(false);
    const [isReplaceSheetVisible, setIsReplaceSheetVisible] = useState(false);

    useEffect(() => {
        if (trackDetails?.isFavorite !== undefined) {
            setIsFavorite(trackDetails.isFavorite);
        }
    }, [trackDetails?.isFavorite]);

    const handleToggleFavorite = async () => {
        if (!trackDetails?.id) return;

        const previousState = isFavorite;
        setIsFavorite(!previousState);

        try {
            if (previousState) {
                await removeFavorite(trackDetails.id);
            } else {
                await addFavorite(trackDetails.id);
            }
        } catch (error: any) {
            if (error?.error?.code === "MAX_FAVORITES_TRACK_REACHED") {
                setIsReplaceSheetVisible(true);
            } else {
                const apiMessage = error?.error?.message || error?.message || "Şarkı favorilere eklenirken bir hata oluştu.";
                Alert.alert("Hata", apiMessage);
            }
            setIsFavorite(previousState);
        }
    };

    return (
        <>
            <Stack.Screen
                options={
                    {
                        headerTransparent: true,
                        title: trackDetails?.title,
                        headerRightActions: [
                            {
                                id: "add-favorite",
                                icon: "sparkles",
                                size: 22,
                                color: isFavorite ? "#FFD700" : Colors.textMuted,
                                onPress: handleToggleFavorite,
                            },
                        ],
                    } as any
                }
            />
            <View style={{ flex: 1, backgroundColor: "#121212" }}>
                <TrackDetailView
                    trackDetails={trackDetails}
                    isLoading={isLoading}
                    error={error}
                    refetchAll={refetchAll}
                    toggleLike={toggleLike}
                    submitInteraction={submitInteraction}
                />
            </View>
            {trackDetails?.id && (
                <ReplaceFavoriteBottomSheet
                    isVisible={isReplaceSheetVisible}
                    onClose={() => setIsReplaceSheetVisible(false)}
                    type="track"
                    newItemId={trackDetails.id}
                    onSuccess={() => {
                        setIsFavorite(true);
                    }}
                />
            )}
        </>
    );
}
