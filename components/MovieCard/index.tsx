import { View, Image } from "react-native";

import { styles } from "./styles";
import { IMovieCardProps } from "./types";

import MovieCardFooter from "./MovieCardFooter";

export default function MovieCard({
    title,
    poster,
    interactions,
    variant = "profile"
}: IMovieCardProps) {
    return (
        <View style={styles.movieCard}>
            <Image
                source={{ uri: poster }}
                style={styles.poster}
                accessibilityLabel={title}
            />
            <MovieCardFooter interactions={interactions} variant={variant} />
        </View>
    );
}
