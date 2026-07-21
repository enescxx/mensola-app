import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TextField from "../../components/TextField";
import Button from "../../components/Button";

import { useResetPassword } from "../../hooks/auth/useResetPassword";

export default function ResetPasswordScreen() {
    const {
        newPassword,
        setNewPassword,
        isLoading,
        error,
        handleResetPassword
    } = useResetPassword();

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
                        label="Yeni Şifre"
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <Button
                        label="Şifreyi Sıfırla"
                        onPress={handleResetPassword}
                    />
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
