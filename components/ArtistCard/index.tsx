import { Text, View, Image, TouchableOpacity } from "react-native";

import { IArtistCardProps } from "./types";
import { styles } from "./styles";

export default function ArtistCard({
    name,
    avatarUrl,
    followers,
    onPress
}: IArtistCardProps) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.avatarWrapper}>
                <Image source={{ uri: avatarUrl }} style={styles.fullImage} />
            </View>
            <Text style={styles.mainTitle} numberOfLines={1}>
                {name}
            </Text>
            {followers && (
                <Text style={styles.subTitle} numberOfLines={1}>
                    {`${followers} followers`}
                </Text>
            )}
        </TouchableOpacity>
    );
}
