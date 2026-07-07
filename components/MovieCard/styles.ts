import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    movieCard: { width: 120 },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 16,
        marginBottom: 8,
        backgroundColor: "#1e1e1e"
    },
    cardFooter: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        padding: 0,
        gap: 4
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,128,0,0.1)",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    },
    badgeText: {
        color: "#FF8000",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 4
    }
});
