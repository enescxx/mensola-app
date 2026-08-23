import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import DynamicList from "../DynamicList";
import { styles } from "./styles";
import MusicCard from "../MusicCard";
import { SpotifyTrackItem } from "@/types/spotify.types";
import MovieCard from "../MovieCard";
import { TmdbMovieItem } from "@/types/tmdb.types";
import { SearchResultListProps } from "./types";
import { useRouter } from "expo-router";

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
                        onPress={() => {
                            addSearch({ type: "movie", data: movie });
                            router.push(`/movies/${item.tmdbId}?type=tmdb`);
                        }}
                    />
                );
            case "track":
                const track = item as SpotifyTrackItem;
                return (
                    <MusicCard<SpotifyTrackItem>
                        layout="horizontal"
                        type="track"
                        data={track}
                        onPress={() => {
                            addSearch({ type: "track", data: track });
                            router.push(`/tracks/${item.spotifyId}?type=spotify`);
                        }}
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
                <ActivityIndicator size="small" color="#1DB954" />
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
