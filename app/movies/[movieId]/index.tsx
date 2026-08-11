import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import MovieDetailView from "@/components/Movies/MovieDetailView";
import { useMovie } from "@/hooks/movie/useMovie";

export default function MoviePage() {
    const { movieId } = useLocalSearchParams<{ movieId?: string }>();
    const { movie, isLoading, error } = useMovie(movieId);

    return (
        <SafeAreaView style={styles.container}>
            <MovieDetailView movie={movie} isLoading={isLoading} error={error} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
});
