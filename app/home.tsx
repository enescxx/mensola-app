import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.title}>mensola'ya Hoş Geldiniz! 🚀</Text>
                <Text style={styles.subtitle}>
                    Müzik, film ve kitap dünyanız burada başlayacak.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212"
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        color: "#a0a0a0",
        textAlign: "center"
    }
});
