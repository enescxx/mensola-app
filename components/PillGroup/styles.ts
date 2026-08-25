import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flexDirection: "row", gap: 8, marginTop: 8 },
    pill: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    activePill: {
        backgroundColor: Colors.primary,
        borderColor: Colors.border,
    },
    text: { color: Colors.textMuted, fontSize: 14, fontWeight: "600" },
    activeText: { color: Colors.textPrimary },
    icon: { color: Colors.textMuted, fontSize: 14, fontWeight: "600" },
    activeIcon: { color: Colors.textPrimary },
});
