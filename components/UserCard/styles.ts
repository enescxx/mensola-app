import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#181818",
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: "#333333",
        overflow: "hidden"
    },
    imageWrapper: {
        backgroundColor: "#1e1e1e",
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#333333",
        overflow: "hidden"
    },
    avatar: { width: "100%", height: "100%", resizeMode: "cover" },
    nameWrapper: { flex: 1 },
    fullnameText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
    usernameText: { fontSize: 12, color: "#8c8c8c" },
    btnFollow: {
        width: 120,
        height: 36,
        paddingVertical: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    btnFollowing: {
        width: 120,
        height: 36,
        paddingVertical: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#333333"
    },
    btnText: { fontSize: 14 }
});

export { styles };
