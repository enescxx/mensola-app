import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TmdbMovieItem } from "@/types/tmdb.types";
import { SpotifyTrackItem } from "@/types/spotify.types";
import { IUser } from "@/types/user.types";

const STORAGE_KEY = "@search_history";
const MAX_HISTORY_LIMIT = 10;

export type NewSearchHistoryItem =
    | { type: "movie"; data: TmdbMovieItem }
    | { type: "track"; data: SpotifyTrackItem }
    | { type: "user"; data: IUser };
export type SearchHistoryItem = NewSearchHistoryItem & { searchedAt: number };

export const useSearchHistory = () => {
    const [history, setHistory] = useState<SearchHistoryItem[]>([]);

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
            if (stored) {
                try {
                    const parsed: SearchHistoryItem[] = JSON.parse(stored);

                    parsed.sort((a, b) => b.searchedAt - a.searchedAt);
                    setHistory(parsed);
                } catch {
                    setHistory([]);
                }
            }
        });
    }, []);

    const isSameHistoryItem = (
        a: SearchHistoryItem | NewSearchHistoryItem,
        b: SearchHistoryItem | NewSearchHistoryItem,
    ) => {
        if (a.type === "movie" && b.type === "movie") {
            return a.data.tmdbId === b.data.tmdbId;
        }
        if (a.type === "track" && b.type === "track") {
            return a.data.spotifyId === b.data.spotifyId;
        }
        if (a.type === "user" && b.type === "user") {
            return a.data.id === b.data.id;
        }
        return false;
    };

    const addSearch = async (item: NewSearchHistoryItem) => {
        const newItem: SearchHistoryItem = {
            ...item,
            searchedAt: Date.now(),
        };

        setHistory((prevHistory) => {
            const filtered = prevHistory.filter((h) => !isSameHistoryItem(h, item));

            const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_LIMIT);
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const removeSearch = async (item: SearchHistoryItem) => {
        setHistory((prevHistory) => {
            const updated = prevHistory.filter((h) => !isSameHistoryItem(h, item));
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const clearHistory = async () => {
        setHistory([]);
        await AsyncStorage.removeItem(STORAGE_KEY);
    };

    return { history, addSearch, removeSearch, clearHistory };
};
