import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 100
    },
    headerContent: { paddingHorizontal: 20, gap: 12 },
    headerTopRow: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    imageWrapper: {
        backgroundColor: "#1e1e1e",
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: "#333333",
        overflow: "hidden"
    },
    profilePicture: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    rightInfoContainer: { flex: 1, gap: 8 },
    nameWrapper: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    },
    fullnameLabel: { fontSize: 20, color: "#fff", fontWeight: "bold" },
    usernameLabel: { fontSize: 16, color: "#8c8c8c" },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8
    },
    statItem: {
        backgroundColor: "#1e1e1e",
        borderRadius: 16,
        aspectRatio: 1,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#333333"
    },
    statValue: { fontSize: 16, color: "#fff" },
    statLabel: { fontSize: 12, color: "#8c8c8c" },
    userBio: { color: "#8c8c8c" },
    profileFooter: { gap: 4, paddingHorizontal: 20, marginTop: 20 },
    footerItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1e1e1e",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#333333"
    },
    footerItemRightContainer: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    },
    footerItemLabel: { color: "#fff" },
    footerItemValue: { color: "#8c8c8c" }
});

export { styles };
