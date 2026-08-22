import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
    resultsContainer: { flex: 1 },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        padding: 24,
    },
    errorText: { color: "#8c8c8c", fontSize: 16, textAlign: "center", marginBottom: 16 },
    retryButton: { backgroundColor: "#1DB954", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
    retryText: { color: "white", fontWeight: "600" },
    header: { paddingHorizontal: 12, marginBottom: 12 },
    searchBarIcons: { color: "#888", fontSize: 18 },
    searchContainer: {
        height: 48,
        borderRadius: 34,
        backgroundColor: "#1e1e1e",
        borderWidth: 1,
        borderColor: "#333333",
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
