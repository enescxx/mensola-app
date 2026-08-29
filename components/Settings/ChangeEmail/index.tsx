import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { Colors } from "@/constants/colors";
import { useChangeEmail } from "@/hooks/user/useChangeEmail";

import { styles } from "./styles";
import { IChangeEmailProps } from "./types";

export default function ChangeEmail({ currentEmail, onSuccess }: IChangeEmailProps) {
    const {
        email,
        setEmail,
        password,
        setPassword,
        code,
        setCode,
        step,
        isLoading,
        errorMessage,
        canSubmit,
        handleRequestCode,
        handleVerifyCode,
    } = useChangeEmail({ onSuccess });

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                {/* ── Current Email Badge ── */}
                <View style={styles.currentBadge}>
                    <Ionicons name="lock-closed" size={16} color={Colors.textSecondary} />
                    <Text style={styles.currentBadgeText}>Mevcut: {currentEmail}</Text>
                </View>

                {step === 1 ? (
                    <>
                        {/* ── Step 1: Input Fields ── */}
                        <View>
                            <Text style={styles.inputLabel}>Yeni E-posta Adresi</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="mail-outline"
                                    size={18}
                                    color={Colors.textMuted}
                                    style={styles.inputIconLeft}
                                />
                                <TextField
                                    style={styles.textFieldOverride}
                                    placeholder="yeni@email.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next"
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.inputLabel}>Mevcut Şifre</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="key-outline"
                                    size={18}
                                    color={Colors.textMuted}
                                    style={styles.inputIconLeft}
                                />
                                <TextField
                                    style={styles.textFieldOverride}
                                    placeholder="••••••••"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={secureTextEntry}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="done"
                                />
                                <TouchableOpacity
                                    onPress={() => setSecureTextEntry((prev) => !prev)}
                                    style={styles.inputIconRight}
                                    activeOpacity={0.7}>
                                    <Ionicons
                                        name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color={Colors.textSecondary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* ── Security Notice Box ── */}
                        <View style={styles.noticeCard}>
                            <View style={styles.noticeHeader}>
                                <Ionicons
                                    name="information-circle-outline"
                                    size={16}
                                    color={Colors.primary}
                                />
                                <Text style={styles.noticeTitle}>Güvenlik Uyarısı</Text>
                            </View>
                            <Text style={styles.noticeText}>
                                Yeni e-posta adresinize 6 haneli bir doğrulama kodu gönderilecektir.
                                Kod doğrulanana kadar mevcut e-posta adresiniz aktif kalmaya devam eder.
                            </Text>
                        </View>
                    </>
                ) : (
                    <>
                        {/* ── Step 2: Verification Code Entry ── */}
                        <View>
                            <Text style={styles.inputLabel}>Doğrulama Kodu</Text>
                            <Text style={styles.otpDescription}>
                                {email} adresine gönderilen 6 haneli kodu girin.
                            </Text>
                            <View style={styles.inputContainer}>
                                <TextField
                                    style={styles.otpInput}
                                    placeholder="000000"
                                    value={code}
                                    onChangeText={(text) => setCode(text.replace(/[^0-9]/g, "").slice(0, 6))}
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    autoFocus
                                    returnKeyType="done"
                                />
                            </View>
                        </View>
                    </>
                )}

                {/* ── Error message block ── */}
                {errorMessage && <Text style={styles.helperText}>{errorMessage}</Text>}
            </ScrollView>

            {/* ── Pinned Action Button ── */}
            <View style={styles.footer}>
                <Button
                    label={
                        isLoading
                            ? "Lütfen bekleyin..."
                            : step === 1
                              ? "Doğrulama Kodu Gönder"
                              : "E-postayı Doğrula ve Güncelle"
                    }
                    onPress={step === 1 ? handleRequestCode : handleVerifyCode}
                    disabled={!canSubmit || isLoading}
                    style={[styles.saveButton, (!canSubmit || isLoading) && styles.saveButtonDisabled]}
                    labelStyle={[styles.saveButtonLabel, (!canSubmit || isLoading) && styles.saveButtonLabelDisabled]}
                />
            </View>
        </View>
    );
}
