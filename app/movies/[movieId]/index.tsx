import { StyleSheet, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import MovieDetailView from "@/components/Movies/MovieDetailView";
import { useMovie } from "@/hooks/movie/useMovie";
import { MovieId, TmdbId } from "@/types/common.types";

export default function MoviePage() {
    const { movieId, type } = useLocalSearchParams<{
        movieId: string;
        type?: "tmdb" | "app";
    }>();

    const { movie, isLoading, error } = useMovie(
        type === "tmdb" ? (Number(movieId) as TmdbId) : (movieId as MovieId),
        type ?? "app",
    );

    return (
        <>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    title: movie?.title,
                }}
            />
            <View style={styles.container}>
                <MovieDetailView movie={movie} isLoading={isLoading} error={error} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
});
