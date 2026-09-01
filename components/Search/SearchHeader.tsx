import { Ionicons } from "@expo/vector-icons";
import { Keyboard, TouchableOpacity, View } from "react-native";
import TextField from "../TextField";
import { PillGroup, PillOption } from "../PillGroup";
import { SearchTab } from "@/hooks/search/useSearch";
import { styles } from "./styles";
import { SearchHeaderProps } from "./types";

import { useTranslation } from "react-i18next";

export default function SearchHeader({
    query,
    setQuery,
    activeTab,
    setActiveTab,
    isSearching,
    setIsSearching,
}: SearchHeaderProps) {
    const { t } = useTranslation();
    const searchOptions: PillOption<SearchTab>[] = [
        { label: t("search.header.movies"), value: "movie", icon: "film" },
        { label: t("search.header.tracks"), value: "track", icon: "musical-note" },
        { label: t("search.header.users"), value: "user", icon: "people" },
    ];

    return (
        <View style={styles.header}>
            <View style={styles.searchContainer}>
                {isSearching ? (
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss();
                            setQuery("");
                            setIsSearching(false);
                        }}>
                        <Ionicons name="arrow-back" style={styles.searchBarIcons} />
                    </TouchableOpacity>
                ) : (
                    <Ionicons name="search" style={styles.searchBarIcons} />
                )}
                <TextField
                    onFocus={() => {
                        setIsSearching(true);
                    }}
                    style={styles.searchBar}
                    value={query}
                    onChangeText={setQuery}
                    returnKeyType="search"
                    placeholder={t("search.header.placeholder")}
                />
                {isSearching && (
                    <TouchableOpacity onPress={() => setQuery("")}>
                        <Ionicons name="close" style={styles.searchBarIcons} />
                    </TouchableOpacity>
                )}
            </View>
            <PillGroup options={searchOptions} selectedValue={activeTab} onSelect={setActiveTab} />
        </View>
    );
}
