import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import TextField from "../../components/TextField";
import Button from "../../components/Button";

import { useRegister } from "../../hooks/auth/useRegister";

export default function SignupScreen() {
    const router = useRouter();
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        error,
        handleRegister
    } = useRegister();

    useEffect(() => {
        if (isLoading) return;
        if (error) return Alert.alert(error);
    }, [isLoading, error]);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.logoText}>mensola</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextField
                            label="Kullanıcı Adı"
                            type="text"
                            placeholder="username"
                            value={username}
                            onChangeText={setUsername}
                        />
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
                        <TextField
                            label="Şifreyi Onayla"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <Button
                            label="Hesap Oluştur"
                            onPress={handleRegister}
                        />
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>
                            Zaten hesabın var mı?{" "}
                        </Text>
                        <TouchableOpacity onPress={() => router.push("/login")}>
                            <Text style={styles.loginLink}>Giriş Yap</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212" },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 40
    },
    headerContainer: { alignItems: "center", marginBottom: 40 },
    logoText: {
        fontSize: 42,
        fontWeight: "bold",
        color: "#ffffff",
        letterSpacing: 1.5
    },
    subtitleText: { fontSize: 14, color: "#a0a0a0", marginTop: 8 },
    formContainer: { marginBottom: 24 },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16
    },
    footerText: { color: "#a0a0a0", fontSize: 14 },
    loginLink: { color: "#1DB954", fontSize: 14, fontWeight: "bold" }
});
