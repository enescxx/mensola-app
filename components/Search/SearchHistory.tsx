import { SearchHistoryItem, useSearchHistory } from "@/hooks/search/useSearchHistory";
import DynamicList from "../DynamicList";
import { SearchHistoryProps } from "./types";
import { TouchableOpacity, View, Alert } from "react-native";
import MovieCard from "../MovieCard";
import MusicCard from "../MusicCard";
import UserCard from "../UserCard";
import { SpotifyTrackItem } from "@/types/spotify.types";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MovieService } from "@/services/movie.service";
import { TrackService } from "@/services/track.service";
import { TmdbId, SpotifyId } from "@/types/common.types";
import { useGlobalUser } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";

export default function SearchHistory({ history, addSearch, removeSearch, clearHistory }: SearchHistoryProps) {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { user: currentUser } = useGlobalUser();
    const { t } = useTranslation();
    const isFavoriteMode = params.mode === "favorite";

    const handleSelectMovie = async (movie: any) => {
        addSearch({ type: "movie", data: movie });
        if (isFavoriteMode) {
            try {
                await MovieService.addToFavorites({ tmdbId: movie.tmdbId as TmdbId });
                Alert.alert(t("common.success"), t("search.history.movieAddedSuccess", { title: movie.title }), [
                    { text: t("common.ok"), onPress: () => router.push("/me") },
                ]);
            } catch (err: any) {
                const apiErrorMessage =
                    err?.error?.message || err?.message || t("search.history.movieAddedError");
                Alert.alert(t("common.error"), apiErrorMessage);
            }
        } else {
            router.push(`/movies/${movie.tmdbId}?type=tmdb`);
        }
    };

    const handleSelectTrack = async (track: any) => {
        addSearch({ type: "track", data: track });
        if (isFavoriteMode) {
            try {
                await TrackService.addToFavorites({ spotifyId: track.spotifyId as SpotifyId });
                Alert.alert(t("common.success"), t("search.history.trackAddedSuccess", { title: track.title }), [
                    { text: t("common.ok"), onPress: () => router.push("/me") },
                ]);
            } catch (err: any) {
                const apiErrorMessage =
                    err?.error?.message || err?.message || t("search.history.trackAddedError");
                Alert.alert(t("common.error"), apiErrorMessage);
            }
        } else {
            router.push(`/tracks/${track.spotifyId}?type=spotify`);
        }
    };

    const handleSelectUser = (user: any) => {
        addSearch({ type: "user", data: user });
        router.push(`/users/${user.id}`);
    };

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
                            onPress={() => handleSelectMovie(movie)}
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
                            onPress={() => handleSelectTrack(track)}
                        />
                    );
                }
                case "user": {
                    const user = item.data;
                    return (
                        <UserCard
                            user={{
                                id: user.id,
                                username: user.username,
                                fullname: user.fullname,
                                avatar: user.avatar,
                            }}
                            currentUserId={currentUser?.id as any}
                            onCardPress={() => handleSelectUser(user)}
                            isFirst={true}
                            isLast={true}
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
        <View style={styles.resultsContainer}>
            <DynamicList
                variant="vertical"
                data={history}
                renderItem={renderItem}
                keyboardShouldPersistTaps="handled"
                style={{ paddingBottom: 100 }}
            />
        </View>
    );
}
