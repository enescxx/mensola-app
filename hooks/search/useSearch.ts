import { useState } from "react";
import { useMovieSearch } from "./useMovieSearch";
import { useTrackSearch } from "./useTrackSearch";
import { useDebounce } from "../shared/useDebounce";
import { usePreferences } from "../usePreferences";

export type SearchTab = "movie" | "track";

export const useSearch = () => {
    const defaultTab = usePreferences((state) => state["default-tab"]);
    const [activeTab, setActiveTab] = useState<SearchTab>(defaultTab === "tracks" ? "track" : "movie");
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400);

    const movieState = useMovieSearch(activeTab === "movie" ? debouncedQuery : "");
    const trackState = useTrackSearch(activeTab === "track" ? debouncedQuery : "");

    return {
        query,
        setQuery,
        activeTab,
        setActiveTab,
        results: activeTab === "movie" ? movieState.movies : trackState.tracks,
        isLoading: activeTab === "movie" ? movieState.isLoading : trackState.isLoading,
        fetchNextPage: activeTab === "movie" ? movieState.fetchNextPage : trackState.fetchNextPage,
        refetch: activeTab === "movie" ? movieState.refetch : trackState.refetch,
        hasNextPage: activeTab === "movie" ? movieState.hasNextPage : trackState.hasNextPage,
        isFetchingNextPage: activeTab === "movie" ? movieState.isFetchingNextPage : trackState.isFetchingNextPage,
        isError: activeTab === "movie" ? movieState.isError : trackState.isError,
        error: activeTab === "movie" ? movieState.error : trackState.error,
    };
};
