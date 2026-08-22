import { PillOption } from "../PillGroup";
import { SearchTab, useSearch } from "@/hooks/search/useSearch";
import { useState } from "react";
import SearchHeader from "./SearchHeader";
import SearchResultList from "./SearchResultList";
import SearchEmptyState from "./SearchEmptyState";
import { useSearchHistory } from "@/hooks/search/useSearchHistory";
import SearchHistory from "./SearchHistory";

export default function SearchView() {
    const [isSearching, setIsSearching] = useState(false);

    const {
        query,
        setQuery,
        activeTab,
        setActiveTab,
        results,
        isLoading,
        fetchNextPage,
        refetch,
        hasNextPage,
        isFetchingNextPage,
        isError,
        error,
    } = useSearch();
    const { history, addSearch, removeSearch, clearHistory } = useSearchHistory();

    const isMoviesTab = activeTab === "movie";
    const isSearchEmpty = query.trim().length === 0;
    const hasHistory = history.length > 0;

    return (
        <>
            <SearchHeader
                query={query}
                setQuery={setQuery}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isSearching={isSearching}
                setIsSearching={setIsSearching}
            />
            {!isSearchEmpty ? (
                <SearchResultList
                    activeTab={activeTab}
                    results={results}
                    fetchNextPage={fetchNextPage}
                    isLoading={isLoading}
                    refetch={refetch}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    isError={isError}
                    error={error}
                    addSearch={addSearch}
                />
            ) : isSearching && hasHistory ? (
                <SearchHistory
                    history={history}
                    addSearch={addSearch}
                    removeSearch={removeSearch}
                    clearHistory={clearHistory}
                />
            ) : (
                <SearchEmptyState activeTab={activeTab} isMoviesTab={isMoviesTab} />
            )}
        </>
    );
}
