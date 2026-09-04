import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useMovieSearch } from "./useMovieSearch";
import { useTrackSearch } from "./useTrackSearch";
import { useUserSearch } from "./useUserSearch";
import { useDebounce } from "../shared/useDebounce";
import { usePreferences } from "../usePreferences";

export type SearchTab = "movie" | "track" | "user";

export const useSearch = () => {
    const params = useLocalSearchParams();
    const defaultTab = usePreferences((state) => state["default-tab"]);
    const initialTab =
        params.type === "track" || params.type === "movie" || params.type === "user"
            ? (params.type as SearchTab)
            : defaultTab === "tracks"
              ? "track"
              : "movie";

    const [activeTab, setActiveTab] = useState<SearchTab>(initialTab);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400);

    useEffect(() => {
        if (params.type === "track" || params.type === "movie" || params.type === "user") {
            setActiveTab(params.type as SearchTab);
        }
    }, [params.type]);

    const movieState = useMovieSearch(activeTab === "movie" ? debouncedQuery : "");
    const trackState = useTrackSearch(activeTab === "track" ? debouncedQuery : "");
    const userState = useUserSearch(activeTab === "user" ? debouncedQuery : "");

    const getActiveState = () => {
        if (activeTab === "movie") return movieState;
        if (activeTab === "track") return trackState;
        return userState;
    };

    const activeState = getActiveState();

    const isDebouncing = query.trim().length > 0 && query.trim() !== debouncedQuery.trim();
    const isSearching = isDebouncing || activeState.isLoading || activeState.isFetching;

    return {
        query,
        setQuery,
        activeTab,
        setActiveTab,
        results:
            activeTab === "movie" ? movieState.movies : activeTab === "track" ? trackState.tracks : userState.users,
        isLoading: isSearching,
        fetchNextPage: activeState.fetchNextPage,
        refetch: activeState.refetch,
        hasNextPage: activeState.hasNextPage,
        isFetchingNextPage: activeState.isFetchingNextPage,
        isError: activeState.isError,
        error: activeState.error,
    };
};
