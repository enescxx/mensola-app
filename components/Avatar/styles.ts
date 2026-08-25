import { StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    imageWrapper: {
        backgroundColor: Colors.surface,
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
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
        color: Colors.textPrimary,
        fontWeight: "700",
    },
});
