import { useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import DynamicList from "@/components/DynamicList";
import MusicCard from "@/components/MusicCard";
import InteractionView, { InteractionSheet } from "@/components/Interaction";
import AlbumHero from "./AlbumHero";
import { styles } from "./styles";
import { IAlbumDetailViewProps, IAlbumTrackItem, IAlbumInteractionItem } from "./types";

export default function AlbumDetailView({
    albumDetails,
    tracks,
    interactions,
    isLoading,
    isRefetching,
    error,
    refetch,
    toggleLike,
    submitInteraction,
}: IAlbumDetailViewProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"tracks" | "comments">("tracks");
    const [isInteractionSheetOpen, setIsInteractionSheetOpen] = useState<boolean>(false);

    const renderTrackItem = ({ item }: { item: IAlbumTrackItem }) => {
        return (
            <MusicCard
                type="track"
                data={{
                    title: item.title,
                    image: item.image || albumDetails?.image || "",
                    duration: item.duration || 0,
                    artists: item.artists || [],
                }}
                style={{ width: "31%" }}
                onPress={() => router.push(`/tracks/${item.id}` as any)}
            />
        );
    };

    const renderCommentItem = ({ item }: { item: IAlbumInteractionItem }) => {
        return (
            <InteractionView
                data={{
                    id: item.id,
                    rating: typeof item.rating === "string" ? parseFloat(item.rating) : item.rating,
                    isLiked: item.isLiked,
                    user: {
                        id: item.user.id,
                        username: item.user.username,
                        fullname: item.user.fullname || item.user.username,
                        avatar: item.user.avatar || "",
                    },
                    comment: {
                        id: item.comment.id,
                        content: item.comment.content,
                        date: item.comment.date,
                    },
                    likeCount: item.likeCount || 0,
                    replyCount: item.replyCount || 0,
                }}
            />
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1DB954" />
            </View>
        );
    }

    if (error && !albumDetails) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={refetch}>
                    <Text style={styles.retryText}>Tekrar Deneyin</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const isTracksTab = activeTab === "tracks";

    return (
        <View style={styles.container}>
            <DynamicList
                key={activeTab}
                data={isTracksTab ? (tracks as any[]) : (interactions as any[])}
                variant="vertical"
                numColumns={isTracksTab ? 3 : 1}
                columnWrapperStyle={isTracksTab ? styles.rowWrapper : undefined}
                renderItem={isTracksTab ? (renderTrackItem as any) : (renderCommentItem as any)}
                ListHeaderComponent={
                    <>
                        <AlbumHero
                            albumDetails={albumDetails}
                            tracksCount={tracks.length}
                            commentsCount={interactions.length}
                            toggleLike={toggleLike}
                            onCommentPress={() => setIsInteractionSheetOpen(true)}
                        />
                        <View style={styles.tabContainer}>
                            <TouchableOpacity
                                style={[styles.tabButton, isTracksTab && styles.activeTabButton]}
                                onPress={() => setActiveTab("tracks")}
                                activeOpacity={0.7}>
                                <Ionicons
                                    name="disc-outline"
                                    size={18}
                                    color={isTracksTab ? "#1DB954" : "#8c8c8c"}
                                />
                                <Text style={[styles.tabText, isTracksTab && styles.activeTabText]}>
                                    Şarkılar ({tracks.length})
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.tabButton, !isTracksTab && styles.activeTabButton]}
                                onPress={() => setActiveTab("comments")}
                                activeOpacity={0.7}>
                                <Ionicons
                                    name="chatbubble-ellipses-outline"
                                    size={18}
                                    color={!isTracksTab ? "#1DB954" : "#8c8c8c"}
                                />
                                <Text style={[styles.tabText, !isTracksTab && styles.activeTabText]}>
                                    Yorumlar ({interactions.length})
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
                onRefresh={refetch}
                refreshing={isRefetching}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name={isTracksTab ? "disc-outline" : "chatbubble-ellipses-outline"}
                            size={48}
                            color="#444"
                        />
                        <Text style={styles.emptyText}>
                            {isTracksTab
                                ? "Bu albümde henüz şarkı bulunmuyor."
                                : "Bu albüme henüz yorum yapılmamış."}
                        </Text>
                    </View>
                }
            />

            <InteractionSheet
                isVisible={isInteractionSheetOpen}
                onClose={() => setIsInteractionSheetOpen(false)}
                targetType="album"
                targetId={albumDetails?.id || ""}
                mediaTitle={albumDetails?.title || "Albüm"}
                mediaTypeTitle="Albüm"
                mediaPoster={albumDetails?.image}
                initialRating={
                    albumDetails?.currentUserInteraction?.rating
                        ? Number(albumDetails.currentUserInteraction.rating)
                        : 0
                }
                initialComment={albumDetails?.currentUserInteraction?.comment?.content || ""}
                initialIsLiked={albumDetails?.currentUserInteraction?.isLiked ?? albumDetails?.isLiked ?? false}
                onSubmit={async ({ rating, comment, isLiked }) => {
                    await submitInteraction({ rating, comment, isLiked });
                }}
            />
        </View>
    );
}
