import { useState, useEffect } from "react";
import { Alert, ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import MoviePoster from "./MoviePoster";
import Badge from "../Badge";
import { Entypo, Ionicons } from "@expo/vector-icons";
import ActionButton from "./ActionButton";
import { MovieHeroProps } from "./types";
import { useWatched } from "@/hooks/movie/useWatched";
import { useLike } from "@/hooks/movie/useLike";

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

    const { markAsWatched, unmarkAsWatched, isLoading: isWatchedLoading } = useWatched(movie?.id);
    const [isWatched, setIsWatched] = useState<boolean>(movie?.isWatched ?? false);

    const { likeMovie, unlikeMovie, isLoading: isLikeLoading } = useLike(movie?.id);
    const [isLiked, setIsLiked] = useState<boolean>(movie?.currentUserInteraction?.isLiked ?? false);
    const [likesCount, setLikesCount] = useState<number>(movie?.likesCount ?? 0);

    const commentsCount = movie?.commentsCount ?? movie?.interactions?.length ?? 0;

    useEffect(() => {
        if (movie?.isWatched !== undefined) {
            setIsWatched(movie.isWatched);
        }
    }, [movie?.isWatched]);

    useEffect(() => {
        if (movie?.currentUserInteraction?.isLiked !== undefined) {
            setIsLiked(movie.currentUserInteraction.isLiked);
        }
    }, [movie?.currentUserInteraction?.isLiked]);

    useEffect(() => {
        if (movie?.likesCount !== undefined) {
            setLikesCount(movie.likesCount);
        }
    }, [movie?.likesCount]);

    const handleWatchedToggle = () => {
        if (!movie?.id) return;

        if (isWatched) {
            Alert.alert("İzlenenlerden Kaldır", "Bu filmi izlediklerinizden çıkarmak istediğinize emin misiniz?", [
                {
                    text: "Vazgeç",
                    style: "cancel",
                },
                {
                    text: "Kaldır",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await unmarkAsWatched(movie.id, () => {
                                setIsWatched(false);
                            });
                        } catch (e) {
                            // Error handling managed by hook
                        }
                    },
                },
            ]);
        } else {
            markAsWatched(movie.id, () => {
                setIsWatched(true);
            });
        }
    };

    const handleLikeToggle = () => {
        if (!movie?.id) return;

        if (isLiked) {
            unlikeMovie(movie.id, () => {
                setIsLiked(false);
                setLikesCount((prev) => Math.max(0, prev - 1));
            });
        } else {
            likeMovie(movie.id, () => {
                setIsLiked(true);
                setLikesCount((prev) => prev + 1);
            });
        }
    };

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
                        {typeof likesCount === "number" ? (
                            <Badge icon={<Ionicons name="heart" size={12} color="#FF8000" />} value={likesCount} />
                        ) : null}
                        {typeof commentsCount === "number" ? (
                            <Badge icon={<Entypo name="text" size={12} color="#FF8000" />} value={commentsCount} />
                        ) : null}
                    </View>
                    <View style={styles.actionBar}>
                        <ActionButton
                            icon="checkmark"
                            isActive={isWatched}
                            activeColor="#1DB95466"
                            onPress={handleWatchedToggle}
                            isLoading={isWatchedLoading}
                        />
                        <ActionButton icon="add" isActive={true} activeColor="#38BDF866" />
                        <ActionButton
                            icon="heart"
                            isActive={isLiked}
                            activeColor="#FF3B3066"
                            onPress={handleLikeToggle}
                            isLoading={isLikeLoading}
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
