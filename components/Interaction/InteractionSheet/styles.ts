import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        gap: 16,
        paddingVertical: 8,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    poster2x3: {
        width: 48,
        aspectRatio: 2 / 3,
        borderRadius: 8,
        backgroundColor: "#2A2A2A",
    },
    posterSquare: {
        width: 56,
        aspectRatio: 1 / 1,
        borderRadius: 8,
        backgroundColor: "#2A2A2A",
    },
    headerInfo: {
        flex: 1,
        gap: 4,
    },
    mediaTitle: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold",
    },
    mediaTypeBadge: {
        alignSelf: "flex-start",
        backgroundColor: "rgba(255, 128, 0, 0.15)",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    mediaTypeBadgeText: {
        color: "#FF8000",
        fontSize: 12,
        fontWeight: "600",
    },
    section: {
        gap: 8,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sectionTitle: {
        color: "#A7A7A7",
        fontSize: 14,
        fontWeight: "600",
    },
    ratingValue: {
        color: "#FF8000",
        fontSize: 16,
        fontWeight: "bold",
    },
    starsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
    },
    starButton: {
        padding: 4,
    },
    likeRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#262626",
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
    },
    likeLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    likeText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "500",
    },
    commentInput: {
        backgroundColor: "#262626",
        color: "#FFFFFF",
        borderRadius: 12,
        padding: 12,
        minHeight: 88,
        textAlignVertical: "top",
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: "#FF8000",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
