import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: "row",
        position: "absolute",
        width: "80%",
        alignSelf: "center",
        backgroundColor: "#1e1e1e",
        borderRadius: 34,
        height: 68,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#333333",
        padding: 4
    },
    activeTabButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        backgroundColor: "#1DB954",
        borderRadius: 30
    },
    inactiveTabButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 60
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 40
    }
});

export { styles };
