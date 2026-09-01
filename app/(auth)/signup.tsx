import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import TextField from "../../components/TextField";
import Button from "../../components/Button";

import { useRegister } from "../../hooks/auth/useRegister";
import { Colors } from "@/constants/colors";

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
        handleRegister,
    } = useRegister();
    const { t } = useTranslation();

    useEffect(() => {
        if (isLoading) return;
        if (error) return Alert.alert(t("common.error"), error);
    }, [isLoading, error]);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.logoText}>mensola</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextField
                            label={t("auth.signup.usernameLabel")}
                            type="text"
                            placeholder={t("auth.signup.usernamePlaceholder")}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextField
                            label={t("auth.signup.emailLabel")}
                            type="email"
                            placeholder={t("auth.signup.emailPlaceholder")}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextField
                            label={t("auth.signup.passwordLabel")}
                            type="password"
                            placeholder={t("auth.signup.passwordPlaceholder")}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TextField
                            label={t("auth.signup.confirmPasswordLabel")}
                            type="password"
                            placeholder={t("auth.signup.confirmPasswordPlaceholder")}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <Button label={t("auth.signup.submitButton")} onPress={handleRegister} />
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>{t("auth.signup.footerText")} </Text>
                        <TouchableOpacity onPress={() => router.push("/login")}>
                            <Text style={styles.loginLink}>{t("auth.signup.loginLink")}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    headerContainer: { alignItems: "center", marginBottom: 40 },
    logoText: {
        fontSize: 42,
        fontWeight: "bold",
        color: Colors.textPrimary,
        letterSpacing: 1.5,
    },
    formContainer: { marginBottom: 24 },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    footerText: { color: Colors.textSecondary, fontSize: 14 },
    loginLink: { color: Colors.primary, fontSize: 14, fontWeight: "bold" },
});
