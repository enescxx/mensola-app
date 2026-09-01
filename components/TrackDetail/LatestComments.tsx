import { Text, TouchableOpacity, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import InteractionView from "../Interaction";

import { LatestCommentsProps } from "./types";
import { styles } from "./styles";

export default function LatestComments({ interactions, commentsCount }: LatestCommentsProps) {
    const { t } = useTranslation();
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
        <View style={styles.commentsContainer}>
            <View style={styles.commentsHeader}>
                <Text style={styles.commentsTitle}>{t("tracks.detail.latestComments")}</Text>
                <TouchableOpacity onPress={handleSeeAllPress}>
                    <Text style={styles.seeAll}>{t("tracks.detail.seeAll", { count: commentsCount || 0 })}</Text>
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
                            likesCount: 0,
                            replyCount: 0,
                        }}
                    />
                </View>
            ))}
        </View>
    );
}
