import { View, Text } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

import { styles } from "./styles";
import { IMovieCardFooterProps } from "./types";

export default function MovieCardFooter({
    interactions,
    variant
}: IMovieCardFooterProps) {
    const isProfile = variant === "profile";

    return (
        <View style={styles.cardFooter}>
            {interactions.rating && (
                <View style={styles.badge}>
                    <Ionicons name="star" size={12} color="#FF8000" />
                    <Text style={styles.badgeText}>{interactions.rating}</Text>
                </View>
            )}
            {typeof interactions?.likes === "number" &&
            interactions.likes > 0 ? (
                <View style={styles.badge}>
                    <Ionicons name="heart" size={12} color="#FF8000" />
                    {!isProfile && (
                        <Text style={styles.badgeText}>
                            {interactions.likes}
                        </Text>
                    )}
                </View>
            ) : interactions?.likes === true ? (
                <Ionicons name="heart" size={12} color="#FF8000" />
            ) : null}

            {typeof interactions?.reviews === "number" &&
            interactions.reviews > 0 ? (
                <View style={styles.badge}>
                    <Entypo name="text" size={12} color="#FF8000" />
                    {!isProfile && (
                        <Text style={styles.badgeText}>
                            {interactions.reviews}
                        </Text>
                    )}
                </View>
            ) : interactions?.reviews === true ? (
                <Entypo name="text" size={12} color="#FF8000" />
            ) : null}
        </View>
    );
}
