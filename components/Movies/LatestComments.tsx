import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import InteractionView from "../Interaction";
import { InteractionItemResponse } from "@/types/interaction.types";
import { Colors } from "@/constants/colors";
import { useTranslation } from "react-i18next";

interface LatestCommentsProps {
    interactions: InteractionItemResponse[];
}

export default function LatestComments({ interactions }: LatestCommentsProps) {
    const { t } = useTranslation();
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
                <Text style={styles.title}>{t("movies.detail.latestComments")}</Text>
                <TouchableOpacity onPress={handleSeeAllPress}>
                    <Text style={styles.seeAll}>{t("movies.detail.seeAll")}</Text>
                </TouchableOpacity>
            </View>

            {commentInteractions.map((item) => (
                <View key={item.id} style={styles.commentItem}>
                    <InteractionView data={{ ...item, likesCount: 0, replyCount: 0 }} />
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
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: "700",
    },
    seeAll: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: "600",
    },
    commentItem: {
        marginBottom: 8,
    },
});
