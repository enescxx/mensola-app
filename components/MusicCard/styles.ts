import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: { width: 140 },
    imageWrapper: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
        borderWidth: 1,
        borderColor: "#333"
    },
    fullImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    mainTitle: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10
    },
    subTitle: {
        color: "#a0a0a0",
        fontSize: 12,
        marginTop: 2
    }
});
