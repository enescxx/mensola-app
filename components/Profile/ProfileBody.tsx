import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MovieCard from "../MovieCard";
import MusicCard from "../MusicCard";

import { useProfileContext } from "../../context/ProfileContext";
import { MovieSummaryViaInteraction } from "@/types/movie.types";
import { Colors } from "@/constants/colors";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 48 - 24) / 3; // Horizontal padding (24 * 2) and gaps (12 * 2)

export default function ProfileBody() {
    const { bodyData, isOwnProfile } = useProfileContext();
    const { favoriteMovies, favoriteTracks } = bodyData;
    const router = useRouter();

    const moviesList = favoriteMovies || [];
    const tracksList = favoriteTracks || [];

    const showMovieSection = moviesList.length > 0 || isOwnProfile;
    const showTrackSection = tracksList.length > 0 || isOwnProfile;

    const getInteractions = (movie: MovieSummaryViaInteraction) => {
        return {
            rating: movie.rating,
            isLiked: movie.isLiked,
            hasReview: movie.hasReview,
        };
    };

    return (
        <View style={styles.container}>
            {showMovieSection ? (
                <View style={styles.section}>
                    <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>Favori Filmler</Text>
                    </View>
                    <View style={styles.gridRow}>
                        {moviesList.slice(0, 3).map((item) => (
                            <MovieCard
                                key={item.id}
                                title={item.title}
                                poster={item.poster}
                                interactions={getInteractions(item)}
                                variant="profile"
                                style={styles.gridItem}
                                onPress={() => router.push(`/movies/${item.id}`)}
                            />
                        ))}
                        {isOwnProfile && Array.from({ length: 3 - moviesList.length }).map((_, index) => (
                            <TouchableOpacity
                                key={`empty-movie-${index}`}
                                style={styles.emptyMovieCard}
                                onPress={() => router.push("/search?mode=favorite&type=movie")}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="add" size={32} color={Colors.textMuted} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ) : null}

            {showTrackSection ? (
                <View style={styles.section}>
                    <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>Favori Şarkılar</Text>
                    </View>
                    <View style={styles.gridRow}>
                        {tracksList.slice(0, 3).map((item) => (
                            <MusicCard
                                key={item.id}
                                type="track"
                                data={item}
                                style={styles.gridItem}
                                onPress={() => router.push(`/tracks/${item.id}`)}
                            />
                        ))}
                        {isOwnProfile && Array.from({ length: 3 - tracksList.length }).map((_, index) => (
                            <TouchableOpacity
                                key={`empty-track-${index}`}
                                style={styles.emptyTrackCard}
                                onPress={() => router.push("/search?mode=favorite&type=track")}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="add" size={32} color={Colors.textMuted} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    section: {
        marginBottom: 20,
    },
    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 24,
    },
    listTitle: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 24,
        marginTop: 12,
        marginBottom: 16,
    },
    gridRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 24,
        gap: 12,
    },
    gridItem: {
        width: ITEM_WIDTH,
    },
    emptyMovieCard: {
        width: ITEM_WIDTH,
        aspectRatio: 2 / 3,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.15)",
        borderStyle: "dashed",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        justifyContent: "center",
        alignItems: "center",
    },
    emptyTrackCard: {
        width: ITEM_WIDTH,
        aspectRatio: 1,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.15)",
        borderStyle: "dashed",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        justifyContent: "center",
        alignItems: "center",
    },
});
