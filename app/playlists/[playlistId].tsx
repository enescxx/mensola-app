import { useLocalSearchParams, Stack } from "expo-router";

import { PlaylistDetailView } from "@/components/PlaylistDetail";
import { usePlaylistDetails } from "@/hooks/music/usePlaylistDetails";

export default function PlaylistDetailPage() {
    const { playlistId } = useLocalSearchParams<{ playlistId?: string }>();
    const {
        refetchAll,
        playlistDetails,
        tracks,
        loadMoreTracks,
        hasNextTrackPage,
        isFetchingNextTrackPage,
        interactions,
        submitInteraction,
        loadMoreInteractions,
        hasNextInteractionsPage,
        isFetchingNextInteractionPage,
        isLoading,
        isRefetching,
        error,
        toggleLike,
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
                loadMoreTracks={loadMoreTracks}
                hasNextTrackPage={hasNextTrackPage}
                isFetchingNextTrackPage={isFetchingNextTrackPage}
                interactions={interactions}
                loadMoreInteractions={loadMoreInteractions}
                hasNextInteractionsPage={hasNextInteractionsPage}
                isFetchingNextInteractionPage={isFetchingNextInteractionPage}
                isLoading={isLoading}
                isRefetching={isRefetching}
                error={error}
                refetchAll={refetchAll}
                toggleLike={toggleLike}
                submitInteraction={submitInteraction}
            />
        </>
    );
}
