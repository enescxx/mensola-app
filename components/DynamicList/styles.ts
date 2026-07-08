import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
        width: "100%"
    },
    listTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 16
    },
    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 16
    },
    seeAll: { color: "#1DB954", fontSize: 14, marginTop: 24 },
    horizontalContent: {
        paddingHorizontal: 16
    },
    verticalContent: {
        paddingHorizontal: 16,
        paddingBottom: 16
    }
});
