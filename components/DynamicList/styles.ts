import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    listTitle: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 24,
        marginTop: 12,
        marginBottom: 16,
    },
    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 16,
    },
    seeAll: { color: Colors.primary, fontSize: 14, marginTop: 12 },
    horizontalContent: {
        paddingHorizontal: 24,
    },
    verticalContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});
