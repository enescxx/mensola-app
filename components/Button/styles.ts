import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
    },
    label: { color: Colors.textPrimary, fontSize: 16, fontWeight: "bold" },
});

export { styles };
