import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { backgroundColor: "#121212", paddingHorizontal: 12 },
    content: {
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        margin: 12,
        gap: 12
    },
    buttonContainer: {
        flexDirection: "row",
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#333333",
        backgroundColor: "#1e1e1e"
    },
    headerButton: {
        height: 48,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    titleContainer: { flex: 1 },
    titleText: { color: "#fff", fontSize: 16 }
});

export { styles };
