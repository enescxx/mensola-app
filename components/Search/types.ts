import { SearchTab } from "@/hooks/search/useSearch";
import { NewSearchHistoryItem, SearchHistoryItem } from "@/hooks/search/useSearchHistory";
import { SpotifyTrackItem } from "@/types/spotify.types";
import { TmdbMovieItem } from "@/types/tmdb.types";

export type SearchHeaderProps = {
    query: string;
    setQuery: (query: string) => void;
    activeTab: SearchTab;
    setActiveTab: (activeTab: SearchTab) => void;
    isSearching: boolean;
    setIsSearching: (isSearching: boolean) => void;
};
export type SearchResultListProps = {
    activeTab: SearchTab;
    results: any[];
    fetchNextPage: () => void;
    isLoading: boolean;
    refetch: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isError: boolean;
    error: Error | null;
    addSearch: (item: NewSearchHistoryItem) => void;
};
export type SearchEmptyStateProps = {
    activeTab: SearchTab;
    isMoviesTab: boolean;
};
export type SearchHistoryProps = {
    history: SearchHistoryItem[];
    addSearch: (item: NewSearchHistoryItem) => void;
    removeSearch: (item: SearchHistoryItem) => void;
    clearHistory: () => void;
};
export type SearchNoResultsProps = {
    onRefresh?: () => void;
    refreshing?: boolean;
};

