import { Ionicons } from "@expo/vector-icons";
import { Keyboard, TouchableOpacity, View } from "react-native";
import TextField from "../TextField";
import { PillGroup, PillOption } from "../PillGroup";
import { SearchTab } from "@/hooks/search/useSearch";
import { styles } from "./styles";
import { SearchHeaderProps } from "./types";

const SEARCH_OPTIONS: PillOption<SearchTab>[] = [
    { label: "Filmler", value: "movie", icon: "film" },
    { label: "Şarkılar", value: "track", icon: "musical-note" },
    { label: "Kullanıcılar", value: "user", icon: "people" },
];

export default function SearchHeader({
    query,
    setQuery,
    activeTab,
    setActiveTab,
    isSearching,
    setIsSearching,
}: SearchHeaderProps) {
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
                />
                {isSearching && (
                    <TouchableOpacity onPress={() => setQuery("")}>
                        <Ionicons name="close" style={styles.searchBarIcons} />
                    </TouchableOpacity>
                )}
            </View>
            <PillGroup options={SEARCH_OPTIONS} selectedValue={activeTab} onSelect={setActiveTab} />
        </View>
    );
}
