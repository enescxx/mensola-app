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
            {interactions.likes &&
                (!isProfile ? (
                    <View style={styles.badge}>
                        <Ionicons name="heart" size={12} color="#FF8000" />
                        <Text style={styles.badgeText}>
                            {interactions.likes}
                        </Text>
                    </View>
                ) : (
                    <Ionicons name="heart" size={12} color="#FF8000" />
                ))}
            {interactions.reviews &&
                (!isProfile ? (
                    <View style={styles.badge}>
                        <Entypo name="text" size={12} color="#FF8000" />
                        <Text style={styles.badgeText}>
                            {interactions.reviews}
                        </Text>
                    </View>
                ) : (
                    <Entypo name="text" size={12} color="#FF8000" />
                ))}
        </View>
    );
}
