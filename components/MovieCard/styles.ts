import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    movieCard: {
        width: 120,
    },
    posterContainer: {
        position: "relative",
        width: "100%",
        aspectRatio: 2 / 3,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
    },
    poster: {
        width: "100%",
        height: "100%",
    },
    badgeContainer: {
        position: "absolute",
        bottom: 6,
        left: 6,
        right: 6,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 4,
    },
    badgeItem: {
        height: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 128, 0, 0.15)",
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "bold",
        marginLeft: 3,
        includeFontPadding: false,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
        marginTop: 6,
        lineHeight: 16,
    },
});
