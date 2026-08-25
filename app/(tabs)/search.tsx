import SearchView from "@/components/Search";
import { Colors } from "@/constants/colors";
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
        backgroundColor: Colors.background,
        paddingHorizontal: 12,
    },
});
