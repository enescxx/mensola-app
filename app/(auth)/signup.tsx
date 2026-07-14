import React, { useState } from "react";
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

export default function SignupScreen() {
    const router = useRouter();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSignup = () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        if (!email.includes("@")) {
            Alert.alert("Hata", "Geçerli bir e-posta adresi girin.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Hata", "Şifreler birbiriyle eşleşmiyor.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Hata", "Şifre en az 6 karakter olmalıdır.");
            return;
        }

        Alert.alert("Başarılı", "Hesabınız oluşturuldu!", [
            { text: "Tamam", onPress: () => router.replace("/login") }
        ]);
    };

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
                        <Button label="Hesap Oluştur" onPress={handleSignup} />
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
