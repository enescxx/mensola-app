import { useLocalSearchParams, Stack } from "expo-router";

import AlbumDetailView from "@/components/AlbumDetail";
import { useAlbumDetails } from "@/hooks/album/useAlbumDetails";
import { AlbumId } from "@/types/common.types";

export default function AlbumDetailPage() {
    const { albumId } = useLocalSearchParams<{ albumId?: AlbumId }>();
    const {
        albumDetails,
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
        refetchAll,
        toggleLike,
    } = useAlbumDetails(albumId);

    return (
        <>
            <Stack.Screen
                options={{
                    title: albumDetails?.title || "Albüm",
                }}
            />
            <AlbumDetailView
                albumDetails={albumDetails}
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
