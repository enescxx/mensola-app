import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useMovieSearch } from "./useMovieSearch";
import { useTrackSearch } from "./useTrackSearch";
import { useDebounce } from "../shared/useDebounce";
import { usePreferences } from "../usePreferences";

export type SearchTab = "movie" | "track";

export const useSearch = () => {
    const params = useLocalSearchParams();
    const defaultTab = usePreferences((state) => state["default-tab"]);
    const initialTab = (params.type === "track" || params.type === "movie")
        ? params.type
        : (defaultTab === "tracks" ? "track" : "movie");

    const [activeTab, setActiveTab] = useState<SearchTab>(initialTab);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400);

    useEffect(() => {
        if (params.type === "track" || params.type === "movie") {
            setActiveTab(params.type);
        }
    }, [params.type]);

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
