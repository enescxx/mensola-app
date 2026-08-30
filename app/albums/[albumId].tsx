import { useLocalSearchParams, Stack } from "expo-router";

import AlbumDetailView from "@/components/AlbumDetail";
import { useAlbumDetails } from "@/hooks/album/useAlbumDetails";
import { AlbumId } from "@/types/common.types";

export default function AlbumDetailPage() {
    const { albumId, type } = useLocalSearchParams<{ albumId?: string; type?: "spotify" | "app" }>();
    const isSpotify = type === "spotify" || (typeof albumId === "string" && !albumId.match(/^[0-9a-fA-F-]{36}$/));
    const effectiveType = isSpotify ? "spotify" : "app";

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
    } = useAlbumDetails(albumId as any, effectiveType);

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
