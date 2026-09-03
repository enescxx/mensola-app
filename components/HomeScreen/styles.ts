import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HERO_HEIGHT = 280;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scroll: {
        flex: 1,
    },
    section: {
        marginTop: 28,
    },
    bottomPad: {
        height: 120,
    },
    errorWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
        gap: 16,
    },
    errorText: {
        color: Colors.textSecondary,
        fontSize: 15,
        textAlign: "center",
    },
    retryBtn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
    },
    retryText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
});

export const headerStyles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    logoGroup: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoText: {
        color: Colors.textPrimary,
        fontSize: 22,
        fontWeight: "800",
        letterSpacing: -0.8,
    },
});

export const heroStyles = StyleSheet.create({
    heroCard: {
        width: SCREEN_WIDTH,
        height: HERO_HEIGHT,
        overflow: "hidden",
    },
    heroImage: {
        ...StyleSheet.absoluteFill,
    },
    heroGradient: {
        ...StyleSheet.absoluteFill,
    },
    heroMeta: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
    },
    ratingBadge: {
        marginBottom: 8,
    },
    heroTitle: {
        color: Colors.textPrimary,
        fontSize: 22,
        fontWeight: "800",
        letterSpacing: -0.3,
        marginBottom: 6,
    },
    heroOverview: {
        color: "rgba(240,244,255,0.65)",
        fontSize: 12,
        lineHeight: 17,
    },
    dotsRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        marginTop: 12,
    },
    dot: {
        height: 6,
        borderRadius: 3,
    },
    dotActive: {
        width: 24,
        backgroundColor: Colors.primary,
    },
    dotInactive: {
        width: 6,
        backgroundColor: Colors.textMuted,
    },
});

export const sectionHeaderStyles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 14,
    },
    title: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: -0.2,
    },
    seeAll: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: "600",
    },
});

export const listStyles = StyleSheet.create({
    list: {
        paddingHorizontal: 20,
    },
});

export const skeletonStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    dotsRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 14,
        gap: 6,
    },
    dot: {
        marginHorizontal: 2,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 28,
        marginBottom: 14,
    },
    row: {
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 12,
    },
    movieCardSkeleton: {
        alignItems: "flex-start",
    },
    trackCardSkeleton: {
        alignItems: "flex-start",
    },
    mt8: {
        marginTop: 8,
    },
    mt4: {
        marginTop: 4,
    },
});
