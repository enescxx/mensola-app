import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // Group Container
    groupContainer: {
        marginBottom: 16,
    },
    groupWrapper: {
        marginTop: 8,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.textMuted,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 4,
        marginTop: 8,
        paddingHorizontal: 20,
    },

    // Group Item
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.surface,
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
    rowFirst: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    rowLast: {
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    rowDivider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.border,
    },
});
