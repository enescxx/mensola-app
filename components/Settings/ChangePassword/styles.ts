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

    // ── Inputs ───────────────────────────────────────────────────────────────
    inputLabel: {
        fontSize: 14,
        color: Colors.textPrimary,
        fontWeight: "600",
        marginBottom: 6,
    },
    inputContainer: {
        position: "relative",
        justifyContent: "center",
        marginBottom: 4,
    },
    inputIconLeft: {
        position: "absolute",
        left: 14,
        zIndex: 1,
    },
    inputIconRight: {
        position: "absolute",
        right: 14,
        zIndex: 1,
    },
    textFieldOverride: {
        paddingLeft: 38,
        paddingRight: 44,
        marginBottom: 0,
        height: 52,
        borderRadius: 12,
    },

    // ── Forgot Password ──────────────────────────────────────────────────────
    forgotPasswordContainer: {
        alignItems: "flex-end",
        marginTop: 4,
        marginBottom: 8,
    },
    forgotPasswordText: {
        fontSize: 13,
        color: Colors.primary,
        fontWeight: "600",
    },

    // ── Requirements Checklist ───────────────────────────────────────────────
    requirementsContainer: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 16,
        gap: 10,
        marginTop: 8,
    },
    requirementRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    requirementText: {
        fontSize: 13,
        color: Colors.textSecondary,
    },
    requirementTextSuccess: {
        color: Colors.textMuted,
        textDecorationLine: "line-through",
    },

    // ── Helper/Error message ─────────────────────────────────────────────────
    helperText: {
        fontSize: 12,
        color: Colors.danger,
        marginTop: 4,
        paddingHorizontal: 4,
    },

    // ── Action Button (pinned) ───────────────────────────────────────────────
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
