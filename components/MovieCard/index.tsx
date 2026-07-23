import { View, Image } from "react-native";

import { styles } from "./styles";
import { IMovieCardProps } from "./types";

import MovieCardFooter from "./MovieCardFooter";

export default function MovieCard({
    title,
    poster,
    interactions,
    variant = "profile",
    style
}: IMovieCardProps) {
    return (
        <View style={[styles.movieCard, style]}>
            <Image
                source={{ uri: poster }}
                style={styles.poster}
                accessibilityLabel={title}
            />
            {interactions && (
                <MovieCardFooter
                    interactions={interactions}
                    variant={variant}
                />
            )}
        </View>
    );
}
