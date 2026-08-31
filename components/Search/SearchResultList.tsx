import { ActivityIndicator, Text, TouchableOpacity, View, Alert } from "react-native";
import DynamicList from "../DynamicList";
import { styles } from "./styles";
import MusicCard from "../MusicCard";
import { SpotifyTrackItem } from "@/types/spotify.types";
import MovieCard from "../MovieCard";
import { TmdbMovieItem } from "@/types/tmdb.types";
import { SearchResultListProps } from "./types";
import UserCard from "../UserCard";
import { UserService } from "@/services/user.service";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/colors";
import { MovieService } from "@/services/movie.service";
import { TrackService } from "@/services/track.service";
import { TmdbId, SpotifyId } from "@/types/common.types";
import { useGlobalUser } from "@/context/AuthContext";

export default function SearchResultList({
    activeTab,
    results,
    fetchNextPage,
    isLoading,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    addSearch,
}: SearchResultListProps) {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { user: currentUser } = useGlobalUser();
    const isFavoriteMode = params.mode === "favorite";

    const handleSelectMovie = async (movie: TmdbMovieItem) => {
        addSearch({ type: "movie", data: movie });
        if (isFavoriteMode) {
            try {
                await MovieService.addToFavorites({ tmdbId: movie.tmdbId as TmdbId });
                Alert.alert("Başarılı", `"${movie.title}" favori filmlerinize eklendi.`, [
                    { text: "Tamam", onPress: () => router.push("/me") },
                ]);
            } catch (err: any) {
                const apiErrorMessage =
                    err?.error?.message || err?.message || "Film favorilere eklenirken bir hata oluştu.";
                Alert.alert("Hata", apiErrorMessage);
            }
        } else {
            router.push(`/movies/${movie.tmdbId}?type=tmdb`);
        }
    };

    const handleSelectTrack = async (track: SpotifyTrackItem) => {
        addSearch({ type: "track", data: track });
        if (isFavoriteMode) {
            try {
                await TrackService.addToFavorites({ spotifyId: track.spotifyId as unknown as SpotifyId });
                Alert.alert("Başarılı", `"${track.title}" favori şarkılarınıza eklendi.`, [
                    { text: "Tamam", onPress: () => router.push("/me") },
                ]);
            } catch (err: any) {
                const apiErrorMessage =
                    err?.error?.message || err?.message || "Şarkı favorilere eklenirken bir hata oluştu.";
                Alert.alert("Hata", apiErrorMessage);
            }
        } else {
            router.push(`/tracks/${track.spotifyId}?type=spotify`);
        }
    };

    const handleSelectUser = (user: any) => {
        addSearch({
            type: "user",
            data: { id: user.id, username: user.username, fullname: user.fullname, avatar: user.avatar },
        });
        router.push(`/users/${user.id}`);
    };

    const handleFollowUser = async (userId: string, isFollowing: boolean) => {
        try {
            if (isFollowing) {
                await UserService.unfollow(userId as any);
            } else {
                await UserService.follow(userId as any);
            }
            refetch(); // Tabloyu yenilemek en temizi
        } catch (error) {
            console.error(error);
        }
    };

    const renderSearchResults = ({ item }: { item: any }) => {
        switch (activeTab) {
            case "movie":
                const movie = item as TmdbMovieItem;
                return (
                    <MovieCard
                        layout="horizontal"
                        ratingAverage={movie.rating}
                        title={movie.title}
                        poster={movie.poster}
                        releaseDate={movie.releaseDate}
                        genres={movie.genres}
                        onPress={() => handleSelectMovie(movie)}
                    />
                );
            case "track":
                const track = item as SpotifyTrackItem;
                return (
                    <MusicCard<SpotifyTrackItem>
                        layout="horizontal"
                        type="track"
                        data={track}
                        onPress={() => handleSelectTrack(track)}
                    />
                );
            case "user":
                const user = item as any;
                return (
                    <UserCard
                        user={{
                            id: user.id,
                            username: user.username,
                            fullname: user.fullname,
                            avatar: user.avatar,
                            isFollowing: user.isFollowingByMe,
                        }}
                        currentUserId={currentUser?.id as any}
                        onCardPress={() => handleSelectUser(user)}
                        onFollowPress={() => handleFollowUser(user.id, user.isFollowingByMe)}
                        isFirst={true}
                        isLast={true}
                    />
                );
        }
    };

    const handleLoadMore = () => {
        if (isLoading || !hasNextPage || isFetchingNextPage) return null;
        fetchNextPage();
    };

    const renderFooter = () => {
        if (!isFetchingNextPage) return null;
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={Colors.primary} />
            </View>
        );
    };

    if (isError) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error?.message}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={refetch}>
                    <Text style={styles.retryText}>Tekrar Deneyin</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.resultsContainer}>
            <DynamicList
                variant="vertical"
                data={results}
                renderItem={renderSearchResults}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                style={{ paddingBottom: 100 }}
                refreshing={isLoading}
                onRefresh={() => refetch()}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
}
