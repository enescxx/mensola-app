import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        width: 120,
        marginRight: 16,
        alignItems: "center",
    },
    avatarWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: "hidden",
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    fullImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    mainTitle: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "center",
    },
    subTitle: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 2,
        textAlign: "center",
    },
});
