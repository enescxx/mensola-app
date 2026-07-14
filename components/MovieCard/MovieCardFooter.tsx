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
            {interactions.rating ? (
                <View style={styles.badge}>
                    <Ionicons name="star" size={12} color="#FF8000" />
                    <Text style={styles.badgeText}>{interactions.rating}</Text>
                </View>
            ) : null}

            {isProfile ? (
                interactions.isLiked ? (
                    <Ionicons name="heart" size={12} color="#FF8000" />
                ) : null
            ) : interactions.totalLikes && interactions.totalLikes > 0 ? (
                <View style={styles.badge}>
                    <Ionicons name="heart" size={12} color="#FF8000" />
                    <Text style={styles.badgeText}>
                        {interactions.totalLikes}
                    </Text>
                </View>
            ) : null}

            {isProfile ? (
                interactions.comment ? (
                    <Entypo name="text" size={12} color="#FF8000" />
                ) : null
            ) : interactions.totalReviews && interactions.totalReviews > 0 ? (
                <View style={styles.badge}>
                    <Entypo name="text" size={12} color="#FF8000" />
                    <Text style={styles.badgeText}>
                        {interactions.totalReviews}
                    </Text>
                </View>
            ) : null}
        </View>
    );
}
