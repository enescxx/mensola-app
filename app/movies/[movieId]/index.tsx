import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MovieDetailView from "@/components/Movies/MovieDetailView";

export default function MoviePage() {
    return (
        <SafeAreaView style={styles.container}>
            <MovieDetailView />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212"
    },
});
