import { StatDetailProps } from "./types";
import { styles } from "./styles";
import DynamicList from "../DynamicList";
import StatDetailItem from "./StatDetailItem";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useFollow } from "@/hooks/user/useFollow";
import { useRouter } from "expo-router";
import { UserId } from "@/types/common.types";
import { StatDetailsItemMap, StatType } from "@/types/stat.types";
import { FollowUsersResponseDataItem } from "@/types/user.types";

export default function StatDetailView<T extends StatType = StatType>({
    currentUserId,
    statType,
    items,
    loadMore,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    isError,
    refetch,
    isOwnProfile = false,
}: StatDetailProps<T>) {
    const router = useRouter();
    const { followHandler, unfollowHandler } = useFollow();
    const [statDetailItems, setStatDetailItems] = useState(items);

    useEffect(() => setStatDetailItems(items), [items]);

    if (isError && !statType) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Veriler çekilirken bir hata oluştu. Lütfen tekrar deneyiniz.</Text>
                <TouchableOpacity style={styles.retryButton} onPress={refetch}>
                    <Text style={styles.retryText}>Tekrar Deneyin</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1DB954" />
            </View>
        );
    }

    if (!statDetailItems || statDetailItems.length <= 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Şu anda burada gösterilebilecek bir veri bulunamadı</Text>
            </View>
        );
    }

    const isGrid = [
        "watchlist",
        "watched",
        "liked-movies",
        "playlists",
        "liked-tracks",
        "liked-playlists",
        "liked-albums",
        "favorite-tracks",
        "favorite-movies",
    ].includes(statType);

    const renderItem = ({ item, index }: any) => {
        switch (statType) {
            case "movie-lists":
            case "liked-movie-lists":
                return (
                    <StatDetailItem
                        viewType="dynamic-list"
                        data={item.previewMovies}
                        listTitle={item.listTitle}
                        onSeeAllPress={() => {
                            router.push(`/movie-lists/${item.listId}`);
                        }}
                        onListItemPress={(movieId: string) => {
                            router.push(`/movies/${movieId}`);
                        }}
                    />
                );
            case "playlists":
            case "liked-tracks":
            case "liked-playlists":
            case "liked-albums":
            case "favorite-tracks": {
                let cardType: "track" | "playlist" | "album" = "track";

                if (statType.includes("playlist")) {
                    cardType = "playlist";
                } else if (statType.includes("album")) {
                    cardType = "album";
                }

                const handleMusicCardPress = () => {
                    switch (cardType) {
                        case "track":
                            router.push(`/tracks/${item.id}`);
                            break;
                        case "playlist":
                            router.push(`/playlists/${item.id}`);
                            break;
                        case "album":
                            router.push(`/albums/${item.id}`);
                            break;
                    }
                };

                return (
                    <StatDetailItem
                        viewType="music-card"
                        data={item}
                        onPress={handleMusicCardPress}
                        cardType={cardType}
                        hideCreator={isOwnProfile && statType === "playlists" ? true : false}
                    />
                );
            }
            case "watchlist":
            case "watched":
            case "liked-movies":
            case "favorite-movies":
                return (
                    <StatDetailItem
                        viewType="movie-card"
                        data={item}
                        onPress={() => {
                            router.push(`/movies/${item.id}`);
                        }}
                    />
                );
            case "followers":
            case "following": {
                const toggleFollowStateInList = (targetUserId: UserId) => {
                    setStatDetailItems((prev) => {
                        const typedPrev = prev as FollowUsersResponseDataItem[];
                        const mapped = typedPrev?.map((userItem) =>
                            userItem.id === targetUserId
                                ? { ...userItem, isFollowing: !userItem.isFollowing }
                                : userItem,
                        );
                        return mapped as StatDetailsItemMap[T][];
                    });
                };

                const handleFollowPress = (targetId: UserId, isFollowing: boolean) => {
                    if (isFollowing) {
                        Alert.alert(
                            "Takipten çıkılıyor",
                            `${item.fullname || item.username} adlı kişiyi takip etmeyi bırakmak istiyor musunuz?`,
                            [
                                { text: "Hayır", onPress: () => {}, style: "cancel" },
                                {
                                    text: "Evet",
                                    onPress: () => unfollowHandler(targetId, () => toggleFollowStateInList(targetId)),
                                },
                            ],
                        );
                    } else {
                        followHandler(targetId, () => toggleFollowStateInList(targetId));
                    }
                };
                return (
                    <StatDetailItem
                        viewType="user-card"
                        data={item}
                        onCardPress={(userId) => router.push(`/users/${userId}`)}
                        onFollowPress={handleFollowPress}
                        currentUserId={currentUserId}
                        isFirst={index === 0}
                        isLast={index === (statDetailItems?.length ?? 0) - 1}
                    />
                );
            }
        }
    };

    const renderFooter = () => {
        if (!isFetchingNextPage || !isLoading) return null;
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#1DB954" />
            </View>
        );
    };

    const handleLoadMore = () => {
        if (!isFetchingNextPage && hasNextPage) loadMore?.();
    };

    const isUserList = statType === "followers" || statType === "following";

    return (
        <View style={styles.container}>
            <DynamicList
                data={statDetailItems}
                renderItem={renderItem}
                variant="vertical"
                onRefresh={refetch}
                refreshing={isRefetching}
                numColumns={isGrid ? 3 : 1}
                columnWrapperStyle={isGrid ? styles.rowWrapper : undefined}
                ItemSeparatorComponent={isUserList ? () => null : undefined}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
}
