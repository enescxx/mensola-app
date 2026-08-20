import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { IMusicCardProps } from "./types";
import { styles } from "./styles";
import { ITrack } from "@/types/track.types";
import { IAlbum } from "@/types/album.types";
import { IPlaylist } from "@/types/playlist.types";

export default function MusicCard<
    TTrack extends ITrack = ITrack,
    TAlbum extends IAlbum = IAlbum,
    TPlaylist extends IPlaylist = IPlaylist,
>(props: IMusicCardProps<TTrack, TAlbum, TPlaylist>) {
    const { type, data, onPress, style } = props;
    function formatSecondsToMinutes(totalSeconds: number) {
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;

        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    let subtitle: string | null;
    let secondaryInfo: string | null;

    switch (type) {
        case "track": {
            const songData = data as Extract<IMusicCardProps, { type: "track" }>["data"];
            subtitle = songData.artists?.map((artist) => artist.name).join(", ") ?? null;
            secondaryInfo = songData.duration ? `${formatSecondsToMinutes(songData.duration)}` : null;
            break;
        }
        case "album": {
            const albumData = data as Extract<IMusicCardProps, { type: "album" }>["data"];
            subtitle = albumData.artists?.map((artist) => artist.name).join(", ") ?? null;
            secondaryInfo = albumData.releaseYear ? String(albumData.releaseYear) : null;
            break;
        }
        case "playlist": {
            const playlistProps = props as Extract<IMusicCardProps, { type: "playlist" }>;
            const playlistData = playlistProps.data;
            subtitle = playlistProps.hideCreator || !playlistData.creator ? "" : `@${playlistData.creator.username}`;
            secondaryInfo = playlistData.songCount ? `${playlistData.songCount} Şarkı` : null;
            break;
        }
    }

    const title = data.title;
    const image = data.image;
    const fullSubtitle = [subtitle, secondaryInfo].filter(Boolean).join(" • ");

    return (
        <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: image?.toString() }} style={styles.fullImage} />
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
