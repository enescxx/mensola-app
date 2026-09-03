import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import AboutView from "@/components/Settings/About";
import { Colors } from "@/constants/colors";

export default function AboutPage() {
    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <AboutView />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 24,
    },
});
