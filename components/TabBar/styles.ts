import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: "row",
        position: "absolute",
        width: "80%",
        alignSelf: "center",
        backgroundColor: Colors.surface,
        borderRadius: 34,
        height: 68,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 4,
    },
    activeTabButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        backgroundColor: Colors.primary,
        borderRadius: 30,
    },
    inactiveTabButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 60,
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
    },
    badge: {
        position: "absolute",
        top: 2,
        right: -3,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.accentPink,
        borderWidth: 1.5,
        borderColor: Colors.surface,
    },
    activeBadge: {
        borderColor: Colors.primary,
    },
});

export { styles };
