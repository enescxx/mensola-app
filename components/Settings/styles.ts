import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        paddingBottom: 24,
    },
    // SettingsItem Styles
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        color: Colors.textPrimary,
        fontWeight: "500",
    },
    dangerLabel: {
        fontSize: 16,
        color: Colors.danger,
        fontWeight: "500",
    },
    description: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginTop: 4,
        lineHeight: 18,
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    valueText: {
        fontSize: 15,
        color: Colors.textSecondary,
        marginRight: 6,
    },
    icon: {
        marginRight: 12,
    },

    // Bottom Sheet Options Styles
    sheetOptionList: {
        paddingBottom: 24,
    },
    sheetOptionItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.border,
    },
    sheetOptionItemLast: {
        borderBottomWidth: 0,
    },
    sheetOptionText: {
        fontSize: 16,
        color: Colors.textPrimary,
    },
    sheetOptionTextActive: {
        color: Colors.primary,
        fontWeight: "600",
    },
});
