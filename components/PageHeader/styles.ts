import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        paddingHorizontal: 12,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        margin: 12,
        gap: 12,
    },
    buttonContainer: {
        flexDirection: "row",
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
    },
    headerButton: {
        height: 48,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titleContainer: {
        flex: 1,
        height: 48,
        borderRadius: 24,
        paddingHorizontal: 24,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
    },
    titleText: { color: Colors.textSecondary, fontSize: 16 },
});

export { styles };
