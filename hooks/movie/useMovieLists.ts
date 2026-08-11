import { useState, useCallback } from "react";

import { MovieService } from "@/services/movie.service";

export interface IMovieListOption {
    id: string;
    title: string;
    isWatchlist: boolean;
    isChecked: boolean;
}

const useMovieLists = (movieId?: string, initialIsWatchlisted?: boolean) => {
    const [lists, setLists] = useState<IMovieListOption[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    const fetchUserLists = useCallback(async () => {
        if (!movieId) return;

        setIsLoading(true);
        setError("");

        try {
            const response = await MovieService.getUserLists(movieId);
            const rawLists = response?.data?.items || response?.data || [];

            const formattedLists: IMovieListOption[] = [
                {
                    id: "watchlist",
                    title: "İzleme Listesi",
                    isWatchlist: true,
                    isChecked: initialIsWatchlisted ?? false,
                },
                ...rawLists.map((item: any) => ({
                    id: item.listId || item.id,
                    title: item.listTitle || item.title,
                    isWatchlist: false,
                    isChecked:
                        item.containsMovie !== undefined
                            ? Boolean(item.containsMovie)
                            : Array.isArray(item.previewMovies)
                            ? item.previewMovies.some((m: any) => m.id === movieId)
                            : false,
                })),
            ];

            setLists(formattedLists);
        } catch (err: any) {
            setError("Listeler yüklenirken bir hata oluştu.");
        } finally {
            setIsLoading(false);
        }
    }, [movieId, initialIsWatchlisted]);

    const toggleListSelection = async (
        listId: string,
        isWatchlist: boolean,
        onStatusChange?: (newListState: { isWatchlisted: boolean; isInList: boolean }) => void
    ) => {
        if (!movieId) return;

        const targetList = lists.find((l) => l.id === listId);
        if (!targetList) return;

        const currentlyChecked = targetList.isChecked;
        const newChecked = !currentlyChecked;
        setActionLoadingId(listId);
        setError("");

        // Optimistic UI update
        const updatedLists = lists.map((l) =>
            l.id === listId ? { ...l, isChecked: newChecked } : l
        );
        setLists(updatedLists);

        if (onStatusChange) {
            const isWatchlisted = updatedLists.find((l) => l.isWatchlist)?.isChecked ?? false;
            const isInList = updatedLists.some((l) => l.isChecked);
            onStatusChange({ isWatchlisted, isInList });
        }

        try {
            if (isWatchlist) {
                if (currentlyChecked) {
                    await MovieService.removeFromWatchlist(movieId);
                } else {
                    await MovieService.addToWatchlist(movieId);
                }
            } else {
                if (currentlyChecked) {
                    await MovieService.removeMovieFromList(listId, movieId);
                } else {
                    await MovieService.addMovieToList(listId, movieId);
                }
            }
        } catch (err: any) {
            // Revert optimistic update on error
            const revertedLists = lists.map((l) =>
                l.id === listId ? { ...l, isChecked: currentlyChecked } : l
            );
            setLists(revertedLists);

            if (onStatusChange) {
                const isWatchlisted = revertedLists.find((l) => l.isWatchlist)?.isChecked ?? false;
                const isInList = revertedLists.some((l) => l.isChecked);
                onStatusChange({ isWatchlisted, isInList });
            }

            if (err && err.success === false) {
                setError(err.error?.message || err?.message || "İşlem sırasında bir hata oluştu.");
            } else {
                setError("Sunucuya bağlanılamadı.");
            }
        } finally {
            setActionLoadingId(null);
        }
    };

    return {
        lists,
        isLoading,
        actionLoadingId,
        error,
        fetchUserLists,
        toggleListSelection,
    };
};

export { useMovieLists };
