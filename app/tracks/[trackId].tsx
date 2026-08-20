import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { TrackDetailView } from "@/components/TrackDetail";
import { useTrackDetails } from "@/hooks/music/useTrackDetails";
import { TrackId } from "@/types/common.types";

export default function TrackDetailScreen() {
    const { trackId } = useLocalSearchParams<{ trackId?: TrackId }>();
    const { trackDetails, isLoading, error, refetchAll, toggleLike, submitInteraction } = useTrackDetails(trackId);

    return (
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
    );
}
