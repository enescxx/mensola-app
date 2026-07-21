import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import TextField from "../../components/TextField";
import Button from "../../components/Button";

import { useForgotPassword } from "../../hooks/auth/useForgotPassword";

export default function ForgotPasswordScreen() {
    const router = useRouter();

    const { email, setEmail, isLoading, error, handleForgotPassword } =
        useForgotPassword();

    useEffect(() => {
        if (isLoading) return;
        if (error) return Alert.alert(error);
    }, [isLoading, error]);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.innerContainer}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.logoText}>mensola</Text>
                </View>

                <View style={styles.formContainer}>
                    <TextField
                        label="E-posta"
                        type="email"
                        placeholder="ornek@email.com"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Button label="Kod Gönder" onPress={handleForgotPassword} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212" },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24
    },
    headerContainer: { alignItems: "center", marginBottom: 48 },
    logoText: {
        fontSize: 42,
        fontWeight: "bold",
        color: "#ffffff",
        letterSpacing: 1.5
    },
    formContainer: { marginBottom: 24 }
});
