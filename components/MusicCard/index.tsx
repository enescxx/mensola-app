import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { IMusicCardProps } from "./types";
import { styles } from "./styles";

export default function MusicCard({ type, data, onPress }: IMusicCardProps) {
    function formatSecondsToMinutes(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;

        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    let subtitle = "";
    let secondaryInfo = "";

    switch (type) {
        case "song": {
            const songData = data as Extract<
                IMusicCardProps,
                { type: "song" }
            >["data"];
            subtitle = songData.artists.map(artist => artist.name).join(", ");
            secondaryInfo =
                songData.duration && formatSecondsToMinutes(songData.duration);
            break;
        }
        case "album": {
            const albumData = data as Extract<
                IMusicCardProps,
                { type: "album" }
            >["data"];
            subtitle = albumData.artists.map(artist => artist.name).join(", ");
            secondaryInfo =
                albumData.releaseYear && String(albumData.releaseYear);
            break;
        }
        case "playlist": {
            const playlistData = data as Extract<
                IMusicCardProps,
                { type: "playlist" }
            >["data"];
            subtitle = `@${playlistData.creator.username}`;
            secondaryInfo =
                playlistData.songCount && `${playlistData.songCount} Şarkı`;
            break;
        }
    }

    const title = data.title;
    const image = data.image;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.fullImage} />
            </View>
            <Text style={styles.mainTitle} numberOfLines={1}>
                {title}
            </Text>
            <Text style={styles.subTitle} numberOfLines={1}>
                {subtitle + (secondaryInfo ? ` • ${secondaryInfo}` : "")}
            </Text>
        </TouchableOpacity>
    );
}
