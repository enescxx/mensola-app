import React, { useState } from "react";
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

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        if (!email.includes("@")) {
            Alert.alert("Hata", "Lütfen geçerli bir e-posta adresi girin.");
            return;
        }

        router.replace("/(tabs)/home");
    };

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
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16
    },
    footerText: { color: "#a0a0a0", fontSize: 14 },
    registerLink: { color: "#1DB954", fontSize: 14, fontWeight: "bold" }
});
