import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import TextField from "../../components/TextField";
import Button from "../../components/Button";

import { useLogin } from "../../hooks/auth/useLogin";

export default function LoginScreen() {
    const router = useRouter();

    const {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        error,
        handleLogin
    } = useLogin();

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
                    <TextField
                        label="Şifre"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button label="Giriş Yap" onPress={handleLogin} />
                    <TouchableOpacity
                        style={styles.forgotPasswordContainer}
                        onPress={() => router.push("/forgot-password")}
                    >
                        <Text style={styles.forgotPasswordText}>
                            Şifremi unuttum
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Hesabınız yok mu? </Text>
                    <TouchableOpacity onPress={() => router.push("/signup")}>
                        <Text style={styles.registerLink}>Kayıt Ol</Text>
                    </TouchableOpacity>
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
    subtitleText: { fontSize: 14, color: "#a0a0a0", marginTop: 8 },
    formContainer: { marginBottom: 24 },
    forgotPasswordContainer: {
        marginTop: 4
    },
    forgotPasswordText: {
        color: "#a0a0a0"
    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16
    },
    footerText: { color: "#a0a0a0", fontSize: 14 },
    registerLink: { color: "#1DB954", fontSize: 14, fontWeight: "bold" }
});
