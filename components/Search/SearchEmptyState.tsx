import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useTrendingMovies } from "@/hooks/movie/useTrendingMovies";
import { useNewAlbums } from "@/hooks/music/useNewAlbums";
import DynamicList from "../DynamicList";
import MovieCard from "../MovieCard";
import MusicCard from "../MusicCard";
import { SearchEmptyStateProps } from "./types";
import { styles } from "./styles";
import { TmdbMovieItem } from "@/types/tmdb.types";
import { NewAlbumsItem } from "@/types/spotify.types";

export default function SearchEmptyState({ activeTab }: SearchEmptyStateProps) {
    const isMoviesTab = activeTab === "movie";
    const isTrackTab = activeTab === "track";

    const movieQuery = useTrendingMovies({ enabled: isMoviesTab });
    const albumQuery = useNewAlbums({ limit: 9, enabled: isTrackTab });

    const currentQuery = isMoviesTab ? movieQuery : albumQuery;
    const { fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, error, totalResults } =
        currentQuery;

    const data = isMoviesTab ? movieQuery.movies : albumQuery.albums;
    const title = isMoviesTab ? `Trendler (${totalResults}+ Film)` : `Yeni Çıkan Albümler (${totalResults})`;

    const handleLoadMore = () => {
        if (isLoading || !hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
    };

    if (isError) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error?.message}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
                    <Text style={styles.retryText}>Tekrar Deneyin</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <DynamicList<TmdbMovieItem | NewAlbumsItem>
            data={data}
            title={title}
            renderItem={({ item }) =>
                isMoviesTab ? (
                    <MovieCard
                        title={(item as any).title}
                        poster={(item as any).poster}
                        interactions={{ rating: (item as any).rating }}
                        style={{ width: "31%" }}
                    />
                ) : (
                    <MusicCard type="album" data={item} style={{ width: "31%" }} />
                )
            }
            variant="vertical"
            numColumns={3}
            columnWrapperStyle={styles.rowWrapper}
            onEndReached={handleLoadMore}
            refreshing={isLoading}
            onRefresh={() => refetch()}
            ListFooterComponent={
                isFetchingNextPage ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#1DB954" />
                    </View>
                ) : null
            }
            style={{ paddingBottom: 100 }}
        />
    );
}
