import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { TrackDetailView } from "@/components/TrackDetail";
import { useTrackDetails } from "@/hooks/music/useTrackDetails";

export default function TrackDetailScreen() {
    const { trackId } = useLocalSearchParams<{ trackId?: string }>();
    const {
        trackDetails,
        isLoading,
        error,
        refetch,
        toggleLike,
        submitInteraction,
    } = useTrackDetails(trackId);

    return (
        <View style={{ flex: 1, backgroundColor: "#121212" }}>
            <TrackDetailView
                trackDetails={trackDetails}
                isLoading={isLoading}
                error={error}
                refetch={refetch}
                toggleLike={toggleLike}
                submitInteraction={submitInteraction}
            />
        </View>
    );
}

