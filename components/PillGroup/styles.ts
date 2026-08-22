import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flexDirection: "row", gap: 8, marginTop: 8 },
    pill: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: "#1e1e1e",
        borderWidth: 1,
        borderColor: "#2e2e2e",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    activePill: {
        backgroundColor: "#1DB954",
        borderColor: "#1DB954",
    },
    text: { color: "#8e8e93", fontSize: 14, fontWeight: "600" },
    activeText: { color: "#ffffff" },
    icon: { color: "#8e8e93", fontSize: 14, fontWeight: "600" },
    activeIcon: { color: "#ffffff" },
});
