import { ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import MoviePoster from "./MoviePoster";
import Badge from "../Badge";
import { Entypo, Ionicons } from "@expo/vector-icons";
import ActionButton from "./ActionButton";
import { MovieHeroProps } from "./types";

const formatReleaseYear = (releaseDate?: string | Date) => {
    if (!releaseDate) return "";
    const date = typeof releaseDate === "string" ? new Date(releaseDate) : releaseDate;
    return Number.isNaN(date.getTime()) ? "" : `(${date.getFullYear()})`;
};

export default function MovieHero({ movie, isLoading, error }: MovieHeroProps) {
    const releaseYear = formatReleaseYear(movie?.releaseDate);
    const durationText = movie?.duration ? `${movie.duration} dk` : "";
    const genreText = movie?.genres?.join(", ") ?? "";
    const interactionsCount = movie?.interactions?.length ?? 0;
    const hasCurrentUserInteraction =
        !!movie?.currentUserInteraction?.rating || !!movie?.currentUserInteraction?.isLiked;

    return (
        <View style={styles.heroBanner}>
            <ImageBackground style={styles.bannerBackgroundImg} source={{ uri: movie?.poster ?? "aaa.jpg" }}>
                <LinearGradient
                    colors={["transparent", "rgba(18, 18, 18, 0.8)", "#121212"]}
                    style={styles.bannerGradient}
                />
            </ImageBackground>
            <View style={styles.bannerContent}>
                <MoviePoster />
                <View style={styles.infoContainer}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.movieTitle}>{movie?.title ?? "Film bilgileri yükleniyor"}</Text>
                        <Text style={styles.releaseDate}>{releaseYear}</Text>
                    </View>
                    <View style={styles.metaWrapper}>
                        {durationText ? <Text style={styles.duration}>{durationText}</Text> : null}
                        {durationText && genreText ? <Text style={styles.dot}>•</Text> : null}
                        {genreText ? <Text style={styles.genres}>{genreText}</Text> : null}
                    </View>
                    <View style={styles.movieStats}>
                        {typeof movie?.rating === "number" && movie.rating > 0 ? (
                            <Badge icon={<Ionicons name="star" size={12} color="#FF8000" />} value={movie.rating} />
                        ) : null}
                        {interactionsCount > 0 ? (
                            <Badge
                                icon={<Ionicons name="heart" size={12} color="#FF8000" />}
                                value={interactionsCount}
                            />
                        ) : null}
                        {movie?.currentUserInteraction ? (
                            <Badge icon={<Entypo name="text" size={12} color="#FF8000" />} value={1} />
                        ) : null}
                    </View>
                    <View style={styles.actionBar}>
                        <ActionButton icon="checkmark" isActive={true} activeColor="#1DB95466" />
                        <ActionButton icon="add" isActive={true} activeColor="#38BDF866" />
                        <ActionButton
                            icon="heart"
                            isActive={movie?.currentUserInteraction?.isLiked ?? false}
                            activeColor="#FF3B3066"
                        />
                        <ActionButton
                            icon="star"
                            isActive={!!movie?.currentUserInteraction?.rating}
                            activeColor="#FFCC0066"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
