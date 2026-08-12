import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        padding: 24,
    },
    errorText: {
        color: "#8c8c8c",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: "#1DB954",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    retryText: {
        color: "white",
        fontWeight: "600",
    },
    rowWrapper: {
        gap: "3.5%",
        paddingHorizontal: "4%",
    },
    // Hero Banner styles (matched with MovieHero)
    heroBanner: {
        height: 310,
        width: "100%",
        position: "relative",
    },
    bannerBackgroundImg: {
        width: "100%",
        height: "100%",
    },
    bannerGradient: {
        ...StyleSheet.absoluteFill,
    },
    bannerContent: {
        position: "absolute",
        bottom: 12,
        left: 16,
        right: 16,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 16,
    },
    posterWrapper: {
        width: 110,
    },
    poster: {
        width: "100%",
        aspectRatio: 2 / 3,
        borderRadius: 14,
        backgroundColor: "#1e1e1e",
    },
    posterPlaceholder: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222222",
    },
    infoContainer: {
        flex: 1,
        gap: 4,
    },
    titleWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    movieTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    creatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    avatar: {
        width: 22,
        height: 22,
        borderRadius: 11,
        marginRight: 6,
    },
    avatarPlaceholder: {
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarLetter: {
        color: "#FFF",
        fontSize: 11,
        fontWeight: "bold",
    },
    creatorName: {
        color: "#B3B3B3",
        fontSize: 13,
        fontWeight: "500",
    },
    movieStats: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 4,
    },
    actionBar: {
        flexDirection: "row",
        gap: 8,
        marginTop: 8,
    },
    descriptionSection: {
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 4,
    },
    description: {
        color: "#CCCCCC",
        fontSize: 14,
        lineHeight: 20,
    },
    readMoreButton: {
        marginTop: 4,
        alignSelf: "flex-start",
    },
    readMoreText: {
        color: "#1DB954",
        fontSize: 13,
        fontWeight: "600",
    },
    tabContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#222222",
        marginTop: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    tabButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 12,
        marginRight: 24,
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    activeTabButton: {
        borderBottomColor: "#1DB954",
    },
    tabText: {
        color: "#8c8c8c",
        fontSize: 15,
        fontWeight: "600",
    },
    activeTabText: {
        color: "#FFFFFF",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 48,
    },
    emptyText: {
        color: "#8c8c8c",
        fontSize: 15,
        marginTop: 12,
    },
    ownerRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#1f1f1f",
    },
    ownerAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
    },
    ownerAvatarPlaceholder: {
        backgroundColor: "#2a2a2a",
        justifyContent: "center",
        alignItems: "center",
    },
    ownerAvatarLetter: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    ownerInfo: {
        flex: 1,
    },
    ownerName: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 2,
    },
    ownerUsername: {
        color: "#8c8c8c",
        fontSize: 13,
    },
    creatorBadge: {
        backgroundColor: "rgba(29, 185, 84, 0.15)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    creatorBadgeText: {
        color: "#1DB954",
        fontSize: 12,
        fontWeight: "600",
    },
});
