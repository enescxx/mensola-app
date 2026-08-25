import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    leftWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    nameWrapper: { flex: 1, justifyContent: "center" },
    fullnameText: { fontSize: 14, color: Colors.textPrimary, fontWeight: "bold" },
    usernameText: { fontSize: 12, color: Colors.textMuted },
    btnFollow: {
        width: 120,
        height: 30,
        paddingVertical: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    btnFollowing: {
        width: 120,
        height: 30,
        paddingVertical: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.surfaceLight,
    },
    btnText: { fontSize: 13 },
});

export { styles };
