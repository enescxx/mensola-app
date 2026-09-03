import { StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    // Hero
    heroContainer: {
        alignItems: "center",
        paddingTop: 32,
        paddingBottom: 28,
        paddingHorizontal: 24,
    },
    appIcon: {
        width: 80,
        height: 80,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
        marginBottom: 14,
    },
    appName: {
        fontSize: 24,
        fontWeight: "800",
        color: Colors.textPrimary,
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    appVersion: {
        fontSize: 14,
        color: Colors.textSecondary,
        fontWeight: "500",
    },
    // List Items
    itemLeft: {
        flex: 1,
        marginRight: 12,
    },
    itemWithIconLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 12,
    },
    socialIcon: {
        marginRight: 12,
        width: 20,
        textAlign: "center",
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: "500",
        color: Colors.textPrimary,
    },
    itemSubtitle: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginTop: 4,
        lineHeight: 18,
    },
    // Footer
    footerContainer: {
        alignItems: "center",
        paddingTop: 32,
        paddingBottom: 24,
        paddingHorizontal: 24,
    },
    footerText: {
        fontSize: 13,
        fontWeight: "500",
        color: Colors.textSecondary,
        textAlign: "center",
        marginBottom: 6,
    },
    developerLink: {
        color: Colors.primary,
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    copyrightText: {
        fontSize: 12,
        color: Colors.textMuted,
        textAlign: "center",
    },
});
