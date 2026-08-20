import { useCallback } from "react";
import { MovieService } from "@/services/movie.service";
import { useDetailBase } from "@/hooks/shared/useDetailBase";
import { useBookmark } from "../shared/useBookmark";
import { useInteracion } from "../shared/useInteraction";
import { useListItems } from "../shared/useListItems";
import { MovieListDetails, MovieSummaryViaInteraction } from "@/types/movie.types";
import { MovieListId } from "@/types/common.types";

export const useMovieListDetails = (listId?: MovieListId) => {
    const {
        details: listDetails,
        setDetails,
        fetchData,
        ...rest
    } = useDetailBase<MovieListDetails, MovieListId>({
        id: listId,
        fetcher: (id) => MovieService.getMovieListDetails(id),
        onLike: (id) => MovieService.likeMovieList(id),
        onUnlike: (id) => MovieService.unlikeMovieList(id),
        getIsLiked: (d) => !!d.isLiked,
        getLikesCount: (d) => d.likesCount ?? 0,
        updateLike: (d, isLiked, count) => ({ ...d, isLiked, likesCount: count }),
    });

    const {
        items: movies,
        fetchNextPage: loadMoreMovies,
        refetch: refetchMovies,
        hasNextPage: hasNextMoviePage,
        isFetchingNextPage: isFetchingNextMoviePage,
    } = useListItems<MovieSummaryViaInteraction, MovieListId>({
        listId: listId,
        itemType: "movie",
        getFn: async (id, page, limit) => await MovieService.getMovieListItems(id, page, limit),
        limit: 18,
    });

    const { toggleSave } = useBookmark<MovieListDetails>({
        targetId: listId,
        targetType: "movieList",
        targetDetails: listDetails || undefined,
        setTargetDetails: (newIsSaved, newSavesCount) =>
            setDetails((prev) =>
                prev
                    ? {
                          ...prev,
                          isSaved: newIsSaved,
                          savesCount: typeof newSavesCount === "number" ? newSavesCount : prev.savesCount,
                      }
                    : prev,
            ),
    });

    const {
        submitInteraction,
        interactions,
        loadMoreInteractions,
        refetchInteractions,
        hasNextPage: hasNextInteractionsPage,
        isFetchingNextPage: isFetchingNextInteractionPage,
    } = useInteracion({
        targetId: listId,
        targetType: "movieList",
        createOrUpdateInteraction: async (data) => {
            await MovieService.createOrUpdateListInteraction(data);
        },
        refreshFn: async (isRefreshing) => {
            await fetchData(isRefreshing);
        },
        getFn: async (data) => await MovieService.getMovieListInteractions(data),
        limit: 20,
    });

    const refetchAll = useCallback(async () => {
        await Promise.all([fetchData(true), refetchInteractions(), refetchMovies()]);
    }, [fetchData, refetchInteractions, refetchMovies]);

    return {
        listDetails,
        toggleSave,
        submitInteraction,
        interactions,
        loadMoreInteractions,
        hasNextInteractionsPage,
        isFetchingNextInteractionPage,
        movies,
        loadMoreMovies,
        hasNextMoviePage,
        isFetchingNextMoviePage,
        fetchData,
        refetchAll,
        ...rest,
    };
};
