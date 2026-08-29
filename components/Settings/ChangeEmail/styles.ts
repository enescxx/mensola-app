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

    // ── Current Email Badge ──────────────────────────────────────────────────
    currentBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 10,
    },
    currentBadgeText: {
        fontSize: 15,
        color: Colors.textSecondary,
        fontWeight: "500",
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

    // ── OTP Code Verification Container ─────────────────────────────────────
    otpDescription: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
        marginBottom: 8,
    },
    otpInput: {
        textAlign: "center",
        fontSize: 24,
        letterSpacing: 8,
        paddingLeft: 8, // Center letter spacing visually
        height: 56,
        backgroundColor: Colors.surface,
        color: Colors.textPrimary,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },

    // ── Security Notice Card ─────────────────────────────────────────────────
    noticeCard: {
        backgroundColor: "#0B1320",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(74, 158, 255, 0.15)",
        padding: 16,
        gap: 10,
    },
    noticeHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    noticeTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.textPrimary,
    },
    noticeText: {
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 19,
    },

    // ── Helper/Error message ─────────────────────────────────────────────────
    helperText: {
        fontSize: 12,
        color: Colors.danger,
        marginTop: -6,
        paddingHorizontal: 4,
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
