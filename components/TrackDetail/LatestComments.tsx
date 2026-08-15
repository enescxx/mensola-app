import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import InteractionView from "../Interaction";
import { ITrackDetails } from "./types";

interface LatestCommentsProps {
    interactions: NonNullable<ITrackDetails["interactions"]>;
    commentsCount?: number;
}

export default function LatestComments({ interactions, commentsCount }: LatestCommentsProps) {
    const router = useRouter();
    const { trackId } = useLocalSearchParams<{ trackId?: string }>();

    const handleSeeAllPress = () => {
        if (trackId) {
            router.push({ pathname: "/tracks/[trackId]/interactions", params: { trackId } } as any);
        }
    };

    const commentInteractions = interactions.filter((item) => !!item.comment?.content);

    if (commentInteractions.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Son Yorumlar</Text>
                <TouchableOpacity onPress={handleSeeAllPress}>
                    <Text style={styles.seeAll}>Tümü ({commentsCount || 0})</Text>
                </TouchableOpacity>
            </View>

            {commentInteractions.map((item) => (
                <View key={item.id} style={styles.commentItem}>
                    <InteractionView
                        data={{
                            id: item.id,
                            rating: typeof item.rating === "string" ? parseFloat(item.rating) : item.rating,
                            isLiked: item.isLiked,
                            user: {
                                id: item.user.id,
                                username: item.user.username,
                                fullname: item.user.fullname || item.user.username,
                                avatar: item.user.avatar || "",
                            },
                            comment: {
                                id: item.comment.id,
                                content: item.comment.content,
                                date: item.comment.date,
                            },
                            likeCount: 0,
                            replyCount: 0,
                        }}
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        paddingTop: 14,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    title: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    seeAll: {
        color: "#1DB954",
        fontSize: 13,
        fontWeight: "600",
    },
    commentItem: {
        marginBottom: 8,
    },
});
