import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    imageWrapper: {
        backgroundColor: "#1e1e1e",
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#333333",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    initialText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
});
