import { TouchableOpacity, Image } from "react-native";

import { styles } from "./styles";
import { IMovieCardProps } from "./types";

import MovieCardFooter from "./MovieCardFooter";

export default function MovieCard({
    title,
    poster,
    interactions,
    variant = "profile",
    style,
    onPress,
}: IMovieCardProps) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.movieCard, style]} activeOpacity={0.7}>
            <Image source={{ uri: poster }} style={styles.poster} accessibilityLabel={title} />
            {interactions && <MovieCardFooter interactions={interactions} variant={variant} />}
        </TouchableOpacity>
    );
}
