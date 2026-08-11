import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "flex-end",
    },
    sheetContainer: {
        backgroundColor: "#1E1E1E",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 32,
        paddingTop: 12,
        maxHeight: "85%",
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    dragHandleArea: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 8,
    },
    dragHandle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#444444",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#2A2A2A",
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
        flex: 1,
    },
    closeButton: {
        padding: 4,
        marginLeft: 8,
    },
    content: {
        width: "100%",
    },
});

export { styles };
