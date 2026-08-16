import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import InteractionView from "../Interaction";
import { GetMovieInteractionsItem } from "../../types";

interface LatestCommentsProps {
    interactions: GetMovieInteractionsItem[];
}

export default function LatestComments({ interactions }: LatestCommentsProps) {
    const router = useRouter();
    const { movieId } = useLocalSearchParams<{ movieId?: string }>();

    const handleSeeAllPress = () => {
        if (movieId) {
            router.push({ pathname: "/movies/[movieId]/interactions", params: { movieId } });
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
                    <Text style={styles.seeAll}>Hepsini Gör</Text>
                </TouchableOpacity>
            </View>

            {commentInteractions.map((item) => (
                <View key={item.id} style={styles.commentItem}>
                    <InteractionView data={{ ...item, likeCount: 0, replyCount: 0 }} />
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
        color: "#ff8a3d",
        fontSize: 13,
        fontWeight: "600",
    },
    commentItem: {
        marginBottom: 8,
    },
});
