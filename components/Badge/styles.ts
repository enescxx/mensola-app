import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    badge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,128,0,0.1)",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        color: "#FF8000",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 4,
    },
});
