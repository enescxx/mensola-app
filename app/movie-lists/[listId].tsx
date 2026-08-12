import { useLocalSearchParams, Stack } from "expo-router";

import { MovieListDetailView } from "@/components/MovieListDetail";
import { useMovieListDetails } from "@/hooks/movie/useMovieListDetails";

export default function MovieListDetailPage() {
    const { listId } = useLocalSearchParams<{ listId?: string }>();
    const { listDetails, movies, interactions, isLoading, isRefetching, error, refetch, toggleLike, submitInteraction } = useMovieListDetails(listId);

    return (
        <>
            <Stack.Screen
                options={{
                    title: listDetails?.title || "Film Listesi",
                }}
            />
            <MovieListDetailView
                listDetails={listDetails}
                movies={movies}
                interactions={interactions}
                isLoading={isLoading}
                isRefetching={isRefetching}
                error={error}
                refetch={refetch}
                toggleLike={toggleLike}
                submitInteraction={submitInteraction}
            />
        </>
    );
}
