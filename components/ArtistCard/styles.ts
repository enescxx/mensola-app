import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        width: 120,
        marginRight: 16,
        alignItems: "center"
    },
    avatarWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
        borderWidth: 1,
        borderColor: "#333"
    },
    fullImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    mainTitle: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "center"
    },
    subTitle: {
        color: "#a0a0a0",
        fontSize: 12,
        marginTop: 2,
        textAlign: "center"
    }
});
