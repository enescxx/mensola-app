import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeScreen from "@/components/HomeScreen";
import { Colors } from "@/constants/colors";

export default function Home() {
    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <HomeScreen />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});
