import { useLocalSearchParams, Stack } from "expo-router";

import AlbumDetailView from "@/components/AlbumDetail";
import { useAlbumDetails } from "@/hooks/music/useAlbumDetails";

export default function AlbumDetailPage() {
    const { albumId } = useLocalSearchParams<{ albumId?: string }>();
    const {
        albumDetails,
        tracks,
        interactions,
        isLoading,
        isRefetching,
        error,
        refetch,
        toggleLike,
        submitInteraction,
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
