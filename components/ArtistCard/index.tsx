import { Text, View, Image, TouchableOpacity } from "react-native";

import { IArtistCardProps } from "./types";
import { styles } from "./styles";

export default function ArtistCard({ artist, onPress }: IArtistCardProps) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.avatarWrapper}>
                <Image
                    source={{ uri: artist?.image }}
                    style={styles.fullImage}
                />
            </View>
            <Text style={styles.mainTitle} numberOfLines={1}>
                {artist.name}
            </Text>
            {artist.followers && (
                <Text style={styles.subTitle} numberOfLines={1}>
                    {`${artist.followers} followers`}
                </Text>
            )}
        </TouchableOpacity>
    );
}
