import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { TrackDetailView } from "@/components/TrackDetail";
import { useTrackDetails } from "@/hooks/music/useTrackDetails";
import { SpotifyId, TrackId } from "@/types/common.types";

export default function TrackDetailScreen() {
    const { trackId, type } = useLocalSearchParams<{
        trackId: string;
        type?: "spotify" | "app";
    }>();

    const { trackDetails, isLoading, error, refetchAll, toggleLike, submitInteraction } = useTrackDetails(
        type === "spotify" ? (trackId as SpotifyId) : (trackId as TrackId),
        type ?? "app",
    );

    return (
        <>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    title: trackDetails?.title,
                }}
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
        </>
    );
}
