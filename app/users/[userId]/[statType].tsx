import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";

import { useStatDetails } from "@/hooks/profile/useStatDetails";
import DynamicList from "@/components/DynamicList";
import MusicCard from "@/components/MusicCard";
import MovieCard from "@/components/MovieCard";
import UserCard from "@/components/UserCard";

import { useGlobalUser } from "@/context/AuthContext";
import { useProfileContext } from "@/context/ProfileContext";
import { STAT_TITLES } from "@/constants/pageTitles";
import { useFollow } from "@/hooks/user/useFollow";

export default function StatDetailPage() {
    const router = useRouter();

    const { statType } = useLocalSearchParams<{ statType: string }>();
    const { user } = useGlobalUser();
    const { favorites, userId } = useProfileContext();

    const pageTitle = STAT_TITLES[statType] || "Detay";

    const initialFavData =
        statType === "favorite-movies"
            ? favorites?.favoriteMovies
            : statType === "favorite-tracks"
              ? favorites?.favoriteTracks
              : undefined;

    const { data, isLoading, isError, refetch, isRefetching } = useStatDetails(statType, initialFavData, userId);
    const { followHandler, unfollowHandler, isLoading: followLoading, error: followError } = useFollow();

    const [statData, setStatData] = useState(data);

    const isMovieGrid = [
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

    useEffect(() => {
        if (isError) {
            Alert.alert("Hata", "Veriler yüklenirken bir sorun oluştu.");
        }
    }, [isError]);

    useEffect(() => {
        if (followError) {
            Alert.alert("Hata", followError);
        }
    }, [followError]);

    useEffect(() => {
        setStatData(data);
    }, [data]);

    const numColumns = isMovieGrid ? 3 : 1;
    const columnWrapperStyle = isMovieGrid ? styles.rowWrapper : undefined;

    const renderItem = ({ item }: { item: any }) => {
        switch (statType) {
            case "movie-lists":
            case "liked-movie-lists":
                return (
                    <DynamicList
                        data={item.previewMovies}
                        variant="horizontal"
                        title={item.listTitle}
                        onSeeAllPress={() => {
                            router.push(`/movie-lists/${item.listId}`);
                        }}
                        renderItem={({ item: movie }: { item: any }) => (
                            <MovieCard
                                key={movie.id}
                                title={movie.title}
                                poster={movie.poster}
                                interactions={movie.interactions}
                                onPress={() => {
                                    router.push(`/movies/${movie.id}`);
                                }}
                            />
                        )}
                    />
                );
            case "playlists":
            case "liked-tracks":
            case "liked-playlists":
            case "liked-albums":
            case "favorite-tracks":
                let type: "song" | "playlist" | "album" = "song";

                if (statType.includes("playlist")) {
                    type = "playlist";
                } else if (statType.includes("album")) {
                    type = "album";
                }

                const handleMusicCardPress = () => {
                    switch (type) {
                        case "song":
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
                    <MusicCard
                        type={type}
                        data={item}
                        variant="row"
                        onPress={() => {
                            handleMusicCardPress();
                        }}
                        style={{ width: "31%" }}
                    />
                );
            case "watchlist":
            case "watched":
            case "liked-movies":
            case "favorite-movies":
                const getInteractions = (movie: any) => {
                    return {
                        rating: movie.rating,
                        isLiked: movie.isLiked,
                        hasReview: movie.hasReview,
                    };
                };
                return (
                    <MovieCard
                        title={item.title}
                        poster={item.poster}
                        interactions={getInteractions(item)}
                        style={{ width: "31%" }}
                        onPress={() => {
                            router.push(`/movies/${item.id}`);
                        }}
                    />
                );
            case "followers":
            case "following":
                const toggleFollowStateInList = (targetUserId: string) => {
                    setStatData((prevData: any[]) =>
                        prevData?.map((userItem) =>
                            userItem.id === targetUserId
                                ? { ...userItem, isFollowing: !userItem.isFollowing }
                                : userItem,
                        ),
                    );
                };

                const handleFollowPress = (targetId: string, isFollowing: boolean) => {
                    if (isFollowing) {
                        Alert.alert(
                            "Takipten çıkılıyor",
                            `${item.fullname || item.username} adlı kişiyi takip etmeyi bırakmak istiyor musunuz?`,
                            [
                                {
                                    text: "Hayır",
                                    onPress: () => {},
                                    style: "cancel",
                                },
                                {
                                    text: "Evet",
                                    onPress: () => {
                                        unfollowHandler(targetId, () => toggleFollowStateInList(targetId));
                                    },
                                },
                            ],
                        );
                    } else {
                        followHandler(targetId, () => toggleFollowStateInList(targetId));
                    }
                };

                const handleCardPress = (targetId: string) => {
                    router.push(`/users/${targetId}`);
                };

                return (
                    <UserCard
                        user={item}
                        currentUserId={user?.id}
                        onFollowPress={handleFollowPress}
                        onCardPress={handleCardPress}
                    />
                );
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1DB954" />
            </View>
        );
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: pageTitle,
                }}
            />
            <View style={styles.container}>
                <DynamicList
                    data={statData}
                    variant="vertical"
                    renderItem={renderItem}
                    onRefresh={refetch}
                    refreshing={isRefetching}
                    ItemSeparatorComponent={<View style={{ height: 8 }} />}
                    numColumns={numColumns}
                    columnWrapperStyle={columnWrapperStyle}
                    ListEmptyComponent={<Text style={styles.emptyText}>Burada henüz bir şey yok.</Text>}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#121212",
        paddingTop: 20,
    },
    rowWrapper: {
        gap: "3.5%" as any,
        paddingHorizontal: "2%" as any,
    },
    emptyText: {
        color: "#8c8c8c",
        alignSelf: "center",
    },
});
