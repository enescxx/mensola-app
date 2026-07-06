import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

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
            { text: "Tamam", onPress: () => router.replace("/") }
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
                        <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="mensolasever"
                            placeholderTextColor="#8c8c8c"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />

                        <Text style={styles.inputLabel}>E-posta</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ornek@email.com"
                            placeholderTextColor="#8c8c8c"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Text style={styles.inputLabel}>Şifre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#8c8c8c"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <Text style={styles.inputLabel}>Şifreyi Onayla</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#8c8c8c"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSignup}
                        >
                            <Text style={styles.buttonText}>Hesap Oluştur</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>
                            Zaten hesabın var mı?{" "}
                        </Text>
                        <TouchableOpacity onPress={() => router.push("/")}>
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
    inputLabel: {
        color: "#ffffff",
        fontSize: 14,
        marginBottom: 8,
        fontWeight: "600"
    },
    input: {
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#333333"
    },
    button: {
        backgroundColor: "#1DB954",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 10
    },
    buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16
    },
    footerText: { color: "#a0a0a0", fontSize: 14 },
    loginLink: { color: "#1DB954", fontSize: 14, fontWeight: "bold" }
});
