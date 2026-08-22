import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    horizontalCard: { height: 70, flexDirection: "row", gap: 12, alignItems: "center" },
    verticalCard: { width: 140 },
    infoWrapper: { flex: 1, justifyContent: "center" },
    imageWrapper: {
        aspectRatio: 1,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
        borderWidth: 1,
        borderColor: "#333",
    },
    horizontalImageWrapper: { width: 70 },
    verticalImageWrapper: { width: "100%" },
    fullImage: { width: "100%", height: "100%", objectFit: "cover" },
    mainTitle: { color: "white", fontSize: 14, fontWeight: "bold", marginTop: 10 },
    albumTitle: { color: "#a0a0a0", fontSize: 12, marginTop: 2 },
    subTitle: { color: "#a0a0a0", fontSize: 12, marginTop: 2 },
});
