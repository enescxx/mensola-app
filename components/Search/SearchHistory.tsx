import { SearchHistoryItem, useSearchHistory } from "@/hooks/search/useSearchHistory";
import DynamicList from "../DynamicList";
import { SearchHistoryProps } from "./types";
import { TouchableOpacity, View } from "react-native";
import MovieCard from "../MovieCard";
import MusicCard from "../MusicCard";
import { SpotifyTrackItem } from "@/types/spotify.types";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function SearchHistory({ history, addSearch, removeSearch, clearHistory }: SearchHistoryProps) {
    const renderItem = ({ item }: { item: SearchHistoryItem }) => {
        const itemView = () => {
            switch (item.type) {
                case "movie": {
                    const movie = item.data;
                    return (
                        <MovieCard
                            layout="horizontal"
                            ratingAverage={movie.rating}
                            title={movie.title}
                            poster={movie.poster}
                            releaseDate={movie.releaseDate}
                            genres={movie.genres}
                            onPress={() => addSearch({ type: "movie", data: movie })}
                        />
                    );
                }
                case "track": {
                    const track = item.data;
                    return (
                        <MusicCard<SpotifyTrackItem>
                            layout="horizontal"
                            type="track"
                            data={track}
                            onPress={() => addSearch({ type: "track", data: track })}
                        />
                    );
                }
            }
        };
        return (
            <View style={styles.historyRow}>
                <View style={styles.historyCardContainer}>{itemView()}</View>
                <TouchableOpacity
                    onPress={() => removeSearch(item)}
                    style={styles.closeButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="close" size={20} color="#888" />
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <DynamicList variant="vertical" data={history} renderItem={renderItem} keyboardShouldPersistTaps="handled" />
    );
}
