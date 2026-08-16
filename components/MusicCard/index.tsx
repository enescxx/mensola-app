import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { IMusicCardProps } from "./types";
import { styles } from "./styles";

export default function MusicCard(props: IMusicCardProps) {
    const { type, data, onPress, style } = props;
    function formatSecondsToMinutes(totalSeconds: number) {
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;

        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    let subtitle = "";
    let secondaryInfo = "";

    switch (type) {
        case "track": {
            const songData = data as Extract<IMusicCardProps, { type: "track" }>["data"];
            subtitle = songData.artists.map((artist) => artist.name).join(", ");
            secondaryInfo = songData.duration && formatSecondsToMinutes(songData.duration);
            break;
        }
        case "album": {
            const albumData = data as Extract<IMusicCardProps, { type: "album" }>["data"];
            subtitle = albumData.artists.map((artist) => artist.name).join(", ");
            secondaryInfo = albumData.releaseYear && String(albumData.releaseYear);
            break;
        }
        case "playlist": {
            const playlistProps = props as Extract<IMusicCardProps, { type: "playlist" }>;
            const playlistData = playlistProps.data;
            subtitle = playlistProps.hideCreator || !playlistData.creator ? "" : `@${playlistData.creator.username}`;
            secondaryInfo = playlistData.songCount ? `${playlistData.songCount} Şarkı` : "";
            break;
        }
    }

    const title = data.title;
    const image = data.image;
    const fullSubtitle = [subtitle, secondaryInfo].filter(Boolean).join(" • ");

    return (
        <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.fullImage} />
            </View>
            <Text style={styles.mainTitle} numberOfLines={1}>
                {title}
            </Text>
            <Text style={styles.subTitle} numberOfLines={1}>
                {fullSubtitle}
            </Text>
        </TouchableOpacity>
    );
}
