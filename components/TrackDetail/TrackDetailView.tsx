import { useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";

import { InteractionSheet } from "@/components/Interaction";
import TrackHero from "./TrackHero";
import LatestComments from "./LatestComments";
import AddToPlaylistBottomSheet from "./AddToPlaylistBottomSheet";
import { styles } from "./styles";
import { ITrackDetailViewProps } from "./types";
import { TrackId } from "@/types/common.types";
import { Colors } from "@/constants/colors";

export default function TrackDetailView({
    trackDetails,
    isLoading,
    error,
    refetchAll,
    toggleLike,
    submitInteraction,
}: ITrackDetailViewProps) {
    const [isInteractionSheetOpen, setIsInteractionSheetOpen] = useState<boolean>(false);
    const [isAddToPlaylistSheetOpen, setIsAddToPlaylistSheetOpen] = useState<boolean>(false);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (error && !trackDetails) {
        console.log(error);
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={refetchAll}>
                    <Text style={styles.retryText}>Tekrar Deneyin</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <TrackHero
                    trackDetails={trackDetails}
                    toggleLike={toggleLike}
                    onCommentPress={() => setIsInteractionSheetOpen(true)}
                    onPlayPress={() => console.log("Play pressed")}
                    onAddPress={() => setIsAddToPlaylistSheetOpen(true)}
                />

                <LatestComments
                    interactions={trackDetails?.interactions ?? []}
                    commentsCount={trackDetails?.commentsCount}
                />
            </ScrollView>

            <InteractionSheet
                isVisible={isInteractionSheetOpen}
                onClose={() => setIsInteractionSheetOpen(false)}
                targetType="track"
                targetId={trackDetails?.id as TrackId}
                mediaTitle={trackDetails?.title || "Şarkı"}
                mediaTypeTitle="Şarkı"
                mediaPoster={trackDetails?.image}
                initialRating={
                    trackDetails?.currentUserInteraction?.rating
                        ? Number(trackDetails.currentUserInteraction.rating)
                        : 0
                }
                initialComment={trackDetails?.currentUserInteraction?.comment?.content || ""}
                initialIsLiked={trackDetails?.currentUserInteraction?.isLiked ?? trackDetails?.isLiked ?? false}
                onSubmit={async ({ rating, comment, isLiked }) => {
                    await submitInteraction({ rating, comment, isLiked });
                }}
            />

            <AddToPlaylistBottomSheet
                isVisible={isAddToPlaylistSheetOpen}
                onClose={() => setIsAddToPlaylistSheetOpen(false)}
                trackId={trackDetails?.id}
            />
        </View>
    );
}
