import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import InteractionView from "../Inteaction";

const comments = [
    {
        id: "interaction-id-1",
        isLiked: true,
        rating: 9.5,
        likeCount: 24,
        replyCount: 8,
        user: {
            id: "user-id-1",
            username: "username-1",
            fullname: "User 1",
            avatar: "avatar.jpg",
        },
        comment: {
            id: "comment-id-1",
            content: "Et sunt Lorem deserunt pariatur fugiat deserunt id aliquip quis nisi incididunt incididunt laboris.",
            date: new Date(),
        },
    },
    {
        id: "interaction-id-2",
        isLiked: true,
        rating: 9.5,
        likeCount: 13,
        replyCount: 2,
        user: {
            id: "user-id-2",
            username: "username-2",
            fullname: "User 2",
            avatar: "avatar.jpg",
        },
        comment: {
            id: "comment-id-2",
            content: "Et sunt Lorem deserunt pariatur fugiat deserunt id aliquip quis nisi incididunt incididunt laboris.",
            date: new Date(),
        },
    },
    {
        id: "interaction-id-3",
        isLiked: true,
        rating: 9.5,
        likeCount: 17,
        replyCount: 5,
        user: {
            id: "user-id-3",
            username: "username-3",
            fullname: "User 3",
            avatar: "avatar.jpg",
        },
        comment: {
            id: "comment-id-3",
            content: "Et sunt Lorem deserunt pariatur fugiat deserunt id aliquip quis nisi incididunt incididunt laboris.",
            date: new Date(),
        },
    },
];

export default function LatestComments() {
    const router = useRouter();
    const { movieId } = useLocalSearchParams<{ movieId?: string }>();

    const handleSeeAllPress = () => {
        if (movieId) {
            router.push({ pathname: "/movie/[movieId]/interactions", params: { movieId } });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Son Yorumlar</Text>
                <TouchableOpacity onPress={handleSeeAllPress}>
                    <Text style={styles.seeAll}>Hepsini Gör</Text>
                </TouchableOpacity>
            </View>

            {comments.map((item) => (
                <View key={item.id} style={styles.commentItem}>
                    <InteractionView data={item} />
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
