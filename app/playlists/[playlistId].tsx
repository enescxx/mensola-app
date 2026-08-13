import { useLocalSearchParams, Stack } from "expo-router";

import { PlaylistDetailView } from "@/components/PlaylistDetail";
import { usePlaylistDetails } from "@/hooks/music/usePlaylistDetails";

export default function PlaylistDetailPage() {
    const { playlistId } = useLocalSearchParams<{ playlistId?: string }>();
    const {
        playlistDetails,
        tracks,
        interactions,
        isLoading,
        isRefetching,
        error,
        refetch,
        toggleLike,
        submitInteraction,
    } = usePlaylistDetails(playlistId);

    return (
        <>
            <Stack.Screen
                options={{
                    title: playlistDetails?.title || "Playlist",
                }}
            />
            <PlaylistDetailView
                playlistDetails={playlistDetails}
                tracks={tracks}
                interactions={interactions}
                isLoading={isLoading}
                isRefetching={isRefetching}
                error={error}
                refetch={refetch}
                toggleLike={toggleLike}
                submitInteraction={submitInteraction}
            />
        </>
    );
}
