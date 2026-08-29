import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 120,
        gap: 16,
    },

    // ── Preview Card ──────────────────────────────────────────────────────────
    previewCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.surface,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 16,
        gap: 14,
    },
    previewText: {
        flex: 1,
        gap: 3,
    },
    previewName: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.textPrimary,
    },
    previewHandle: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: "500",
    },

    // ── Public URL Row ────────────────────────────────────────────────────────
    urlRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 4,
    },
    urlText: {
        fontSize: 13,
        color: Colors.textMuted,
    },

    // ── Input Field ──────────────────────────────────────────────────────────
    inputContainer: {
        position: "relative",
        justifyContent: "center",
    },
    atSymbol: {
        position: "absolute",
        left: 14,
        zIndex: 1,
        fontSize: 17,
        color: Colors.textMuted,
        fontWeight: "500",
    },
    statusIcon: {
        position: "absolute",
        right: 14,
        zIndex: 1,
        width: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    textFieldOverride: {
        paddingLeft: 34,
        paddingRight: 44,
        marginBottom: 0,
        height: 52,
        borderRadius: 12,
    },

    // ── Helper text under input ───────────────────────────────────────────────
    helperText: {
        fontSize: 12,
        marginTop: -8,
        paddingHorizontal: 4,
    },
    helperAvailable: {
        color: Colors.success,
    },
    helperTaken: {
        color: Colors.danger,
    },

    // ── Guidelines Card ───────────────────────────────────────────────────────
    guidelinesCard: {
        backgroundColor: "#0B1320",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(74, 158, 255, 0.15)",
        padding: 16,
        gap: 10,
    },
    guidelinesHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    guidelinesTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.textPrimary,
    },
    bulletRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
    },
    bulletDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.textSecondary,
        marginTop: 7,
    },
    bulletText: {
        flex: 1,
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 19,
    },
    bulletHighlight: {
        color: Colors.primary,
        fontWeight: "600",
    },

    // ── Save Button (pinned) ──────────────────────────────────────────────────
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: 36,
        paddingTop: 16,
        backgroundColor: Colors.background,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    saveButton: {
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: "center",
    },
    saveButtonDisabled: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    saveButtonLabel: {
        fontSize: 16,
        fontWeight: "700",
    },
    saveButtonLabelDisabled: {
        color: Colors.textMuted,
    },
});
