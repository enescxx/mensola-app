import { useLocalSearchParams, Stack } from "expo-router";

import { MovieListDetailView } from "@/components/MovieListDetail";
import { useMovieListDetails } from "@/hooks/movie/useMovieListDetails";

export default function MovieListDetailPage() {
    const { listId } = useLocalSearchParams<{ listId?: string }>();
    const {
        listDetails,
        movies,
        loadMoreMovies,
        hasNextMoviePage,
        isFetchingNextMoviePage,
        interactions,
        loadMoreInteractions,
        hasNextInteractionsPage,
        isFetchingNextInteractionPage,
        isLoading,
        isRefetching,
        error,
        refetchAll,
        toggleLike,
        toggleSave,
        submitInteraction,
    } = useMovieListDetails(listId);

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
                loadMoreMovies={loadMoreMovies}
                hasNextMoviePage={hasNextMoviePage}
                isFetchingNextMoviePage={isFetchingNextMoviePage}
                interactions={interactions}
                loadMoreInteractions={loadMoreInteractions}
                hasNextInteractionsPage={hasNextInteractionsPage}
                isFetchingNextInteractionPage={isFetchingNextInteractionPage}
                isLoading={isLoading}
                isRefetching={isRefetching}
                error={error}
                refetchAll={refetchAll}
                toggleLike={toggleLike}
                toggleSave={toggleSave}
                submitInteraction={submitInteraction}
            />
        </>
    );
}
