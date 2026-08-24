import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: "#1a1f2e",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
        shadowColor: "#000",
        shadowOpacity: 0.16,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    cardContent: {
        gap: 8,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 0,
    },
    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 8,
    },
    nameWrapper: {
        flex: 1,
        justifyContent: "center",
    },
    username: {
        fontSize: 12,
        color: "#9ca3af",
        marginTop: 2,
    },
    fullname: {
        fontSize: 14,
        fontWeight: "700",
        color: "#f9fafb",
    },
    interactionInfo: {
        alignItems: "flex-end",
        gap: 6,
    },
    date: {
        color: "#9ca3af",
        fontSize: 11,
    },
    badges: {
        flexDirection: "row",
        gap: 6,
    },
    badgeItem: {
        height: 26,
        minWidth: 30,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 6,
        paddingVertical: 3,
    },
    commentContainer: {
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 4,
    },
    comment: {
        fontSize: 12.5,
        color: "#f3f4f6",
        lineHeight: 18,
    },
    actionButtons: {
        flexDirection: "row",
        gap: 6,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: "rgba(255,138,61,0.1)",
    },
    actionButtonText: {
        color: "#ff8a3d",
        fontSize: 12,
        fontWeight: "600",
    },
});
