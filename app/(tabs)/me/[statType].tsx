import { useEffect } from "react";

import { StyleSheet, View, Text, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useStatDetails } from "../../../hooks/profile/useStatDetails";

import DynamicList from "../../../components/DynamicList";
import MusicCard from "../../../components/MusicCard";
import MovieCard from "../../../components/MovieCard";
import UserCard from "../../../components/UserCard";

import { useGlobalUser } from "../../../context/AuthContext";
import { useProfileContext } from "../../../context/ProfileContext";

export default function StatDetailPage() {
    const router = useRouter();

    const { statType } = useLocalSearchParams<{ statType: string }>();
    const { user } = useGlobalUser();
    const { favorites } = useProfileContext();

    const initialFavData =
        statType === "favorite-movies"
            ? favorites?.favoriteMovies
            : statType === "favorite-tracks"
              ? favorites?.favoriteTracks
              : undefined;

    const { data, isLoading, isError, error, refetch, isRefetching } =
        useStatDetails(statType, initialFavData);

    const isMovieGrid = [
        "watchlist",
        "watched",
        "liked-movies",
        "playlists",
        "liked-tracks",
        "liked-playlists",
        "liked-albums",
        "favorite-tracks",
        "favorite-movies"
    ].includes(statType);

    const numColumns = isMovieGrid ? 3 : 1;
    const columnWrapperStyle = isMovieGrid ? styles.rowWrapper : undefined;

    const renderItem = ({ item }) => {
        switch (statType) {
            case "movie-lists":
            case "liked-movie-lists":
                return (
                    <DynamicList
                        data={item.movies?.slice(0, 3)}
                        variant="horizontal"
                        title={item.title}
                        onSeeAllPress={() => {}}
                        renderItem={({ item: movie }) => (
                            <MovieCard
                                title={movie.title}
                                poster={movie.poster}
                                interactions={movie.interactions}
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

                return (
                    <MusicCard
                        type={type}
                        data={item}
                        variant="row"
                        onPress={() => {}}
                        style={{ width: "31%" }}
                    />
                );
            case "watchlist":
            case "watched":
            case "liked-movies":
            case "favorite-movies":
                const getInteractions = movie => {
                    return {
                        rating: movie.rating,
                        isLiked: movie.isLiked,
                        hasReview: movie.hasReview
                    };
                };
                return (
                    <MovieCard
                        title={item.title}
                        poster={item.poster}
                        interactions={getInteractions(item)}
                        style={{ width: "31%" }}
                    />
                );
            case "followers":
            case "following":
                const handleFollowPress = (userId, isFollowing) => {
                    if (isFollowing) {
                        Alert.alert(
                            "Takipten çıkılıyor",
                            `${item.fullname || item.username} adlı kişiyi takip etmeyi bırakmak istiyor musunuz?`,
                            [
                                {
                                    text: "Hayır",
                                    onPress: () => {},
                                    style: "cancel"
                                },
                                {
                                    text: "Evet",
                                    onPress: () => {
                                        /* unfollow func */
                                    }
                                }
                            ]
                        );
                    } else {
                        /* follow func */
                    }
                };

                const handleCardPress = userId => {
                    router.push(`/users/${userId}`);
                };

                return (
                    <UserCard
                        user={item}
                        currentUserId={user.id}
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

    useEffect(() => {
        if (isError) {
            Alert.alert("Hata", "Veriler yüklenirken bir sorun oluştu.");
        }
    }, [isError]);

    return (
        <SafeAreaView style={styles.container}>
            <DynamicList
                data={data}
                variant="vertical"
                renderItem={renderItem}
                onRefresh={refetch}
                refreshing={isRefetching}
                ItemSeparatorComponent={<View style={{ height: 8 }} />}
                numColumns={numColumns}
                columnWrapperStyle={columnWrapperStyle}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#121212",
        paddingTop: 20
    },
    rowWrapper: {
        gap: "3.5%",
        paddingHorizontal: "2%"
    }
});
