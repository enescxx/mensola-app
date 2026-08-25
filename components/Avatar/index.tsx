import { View, Text } from "react-native";
import { styles } from "./styles";
import { IAvatarProps } from "./types";
import { Image } from "expo-image";

const AVATAR_COLORS = ["#6366F1", "#EC4899", "#8B5CF6", "#10B981", "#F59E0B", "#3B82F6", "#EF4444", "#14B8A6"];
const getAvatarColor = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

export default function Avatar({ url, name, user, size }: IAvatarProps) {
    const avatarUrl = url || user?.avatar;
    if (avatarUrl) {
        return (
            <View style={[styles.imageWrapper, !!size && { width: size, height: size, borderRadius: size / 2 }]}>
                <Image
                    source={{ uri: avatarUrl.toString() }}
                    style={styles.avatar}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                />
            </View>
        );
    }

    const displayName = (name || user?.fullname || user?.username || "").trim();
    const initial = displayName ? displayName.charAt(0).toUpperCase() : "?";

    const seed = user?.id ? String(user.id) : displayName || "default";
    const backgroundColor = getAvatarColor(seed);

    return (
        <View
            style={[
                styles.imageWrapper,
                !!size && {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                },
                { backgroundColor },
            ]}>
            <Text style={[styles.initialText, !!size && { fontSize: size * 0.42 }]}>{initial}</Text>
        </View>
    );
}
