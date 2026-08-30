import { StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        gap: 16,
        paddingTop: 8,
        paddingBottom: 24,
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    switchLabelGroup: {
        flex: 1,
        marginRight: 12,
    },
    switchLabel: {
        color: Colors.textPrimary,
        fontSize: 15,
        fontWeight: "600",
    },
    switchDesc: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 2,
    },
    errorText: {
        color: Colors.danger,
        fontSize: 13,
        textAlign: "center",
    },
    submitBtn: {
        marginTop: 8,
    },
});
