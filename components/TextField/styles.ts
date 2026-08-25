import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textField: {
        backgroundColor: Colors.surface,
        color: Colors.textPrimary,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    label: {
        color: Colors.textPrimary,
        fontSize: 14,
        marginBottom: 8,
        fontWeight: "600",
    },
});

export { styles };
