import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { IMusicCardProps } from "./types";
import { styles } from "./styles";

export default function MusicCard({
    type,
    title,
    subtitle,
    coverImage,
    duration,
    releaseYear,
    songCount,
    onPress
}: IMusicCardProps) {
    const getExtraInfo = () => {
        if (type === "song" && duration) return duration;
        if (type === "album" && releaseYear) return releaseYear.toString();
        if (type === "playlist" && songCount) return `${songCount} Şarkı`;
        return null;
    };

    const extraInfo = getExtraInfo();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.imageWrapper}>
                <Image source={{ uri: coverImage }} style={styles.fullImage} />
            </View>
            <Text style={styles.mainTitle} numberOfLines={1}>
                {title}
            </Text>
            <Text style={styles.subTitle} numberOfLines={1}>
                {subtitle}
                {extraInfo && ` • ${extraInfo}`}
            </Text>
        </TouchableOpacity>
    );
}
