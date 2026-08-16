import { useCallback } from "react";
import { MovieService } from "@/services/movie.service";
import { useDetailBase } from "@/hooks/shared/useDetailBase";
import { useBookmark } from "../shared/useBookmark";
import { useInteracion } from "../shared/useInteraction";
import { useListItems } from "../shared/useListItems";
import { IMovieListItem } from "@/types";

export interface IMovieListOwner {
    id: string;
    username: string;
    fullname: string;
    avatar: string | null;
    isFollowing?: boolean;
    isFollower?: boolean;
}

export interface IMovieListDetails {
    id: string;
    title: string;
    description?: string;
    image?: string;
    isPrivate?: boolean;
    listType?: string;
    creatorId?: string;
    owners?: IMovieListOwner[];
    isLiked?: boolean;
    isSaved?: boolean;
    likesCount?: number;
    savesCount?: number;
    currentUserInteraction?: {
        id?: string;
        rating?: number;
        isLiked?: boolean;
        comment?: {
            id?: string;
            content?: string;
            date?: string;
        };
    } | null;
}

export interface IMovieListInteractionItem {
    id: string;
    rating?: number;
    isLiked?: boolean;
    user: {
        id: string;
        username: string;
        fullname?: string;
        avatar?: string;
    };
    comment: {
        id: string;
        content: string;
        date: string;
    };
    likeCount: number;
    replyCount: number;
}

export const useMovieListDetails = (listId?: string) => {
    const {
        details: listDetails,
        setDetails,
        fetchData,
        ...rest
    } = useDetailBase<IMovieListDetails>({
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
    } = useListItems<IMovieListItem>({
        listId: listId,
        itemType: "movie",
        getFn: async (id, page, limit) => await MovieService.getMovieListItems(id, page, limit),
        limit: 18,
    });

    const { toggleSave } = useBookmark<IMovieListDetails>({
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
        createOrUpdateInteraction: async (id, data) => {
            await MovieService.createOrUpdateListInteraction(id, data);
        },
        refreshFn: async (isRefreshing) => {
            await fetchData(isRefreshing);
        },
        getFn: async (id, page, limit) => await MovieService.getMovieListInteractions(id, page, limit),
        limit: 20,
    });

    const refetchAll = useCallback(async () => {
        await Promise.all([fetchData(true), refetchInteractions()]);
    }, [fetchData, refetchInteractions]);

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
        refetchMovies,
        hasNextMoviePage,
        isFetchingNextMoviePage,
        fetchData,
        refetchAll,
        ...rest,
    };
};
