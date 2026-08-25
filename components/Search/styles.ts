import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.background },
    resultsContainer: { flex: 1 },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
        padding: 24,
    },
    errorText: { color: Colors.textSecondary, fontSize: 16, textAlign: "center", marginBottom: 16 },
    retryButton: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
    retryText: { color: Colors.textPrimary, fontWeight: "600" },
    header: { paddingHorizontal: 12, marginBottom: 12 },
    searchBarIcons: { color: Colors.textMuted, fontSize: 18 },
    searchContainer: {
        height: 48,
        borderRadius: 34,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: 16,
        marginTop: 24,
        flexDirection: "row",
        alignItems: "center",
    },
    searchBar: { marginBottom: 0, borderWidth: 0, height: 42, flex: 1 },
    rowWrapper: { gap: "3.5%", paddingHorizontal: "2%" },
    historyRow: { flexDirection: "row", alignItems: "center" },
    historyCardContainer: { flex: 1, marginRight: 12 },
    closeButton: { padding: 6, alignItems: "center", justifyContent: "center" },
});
