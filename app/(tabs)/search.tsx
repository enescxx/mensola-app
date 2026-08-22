import SearchView from "@/components/Search";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
    return (
        <SafeAreaView style={styles.container}>
            <SearchView />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        paddingHorizontal: 12,
    },
});
