import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { Colors } from "@/constants/colors";
import { useChangePassword } from "@/hooks/user/useChangePassword";
import { useTranslation } from "react-i18next";

import { styles } from "./styles";
import { IChangePasswordProps } from "./types";

export default function ChangePassword({ onSuccess }: IChangePasswordProps) {
    const { t } = useTranslation();
    const {
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        errorMessage,
        isMinLength,
        hasNumberOrSpecial,
        isNotSameAsCurrent,
        canSubmit,
        doPasswordsMatch,
        handleUpdatePassword,
    } = useChangePassword({ onSuccess });

    const [secureCurrent, setSecureCurrent] = useState(true);
    const [secureNew, setSecureNew] = useState(true);
    const [secureConfirm, setSecureConfirm] = useState(true);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                {/* ── Current Password Input ── */}
                <View>
                    <Text style={styles.inputLabel}>{t("settings.changePassword.currentPasswordLabel")}</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={18}
                            color={Colors.textMuted}
                            style={styles.inputIconLeft}
                        />
                        <TextField
                            style={styles.textFieldOverride}
                            placeholder={t("settings.changePassword.currentPasswordPlaceholder")}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry={secureCurrent}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            onPress={() => setSecureCurrent((prev) => !prev)}
                            style={styles.inputIconRight}
                            activeOpacity={0.7}>
                            <Ionicons
                                name={secureCurrent ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color={Colors.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Forgot Password Link ── */}
                <TouchableOpacity
                    onPress={() => router.push("/(auth)/forgot-password")}
                    style={styles.forgotPasswordContainer}
                    activeOpacity={0.7}>
                    <Text style={styles.forgotPasswordText}>{t("settings.changePassword.forgotPasswordText")}</Text>
                </TouchableOpacity>

                {/* ── New Password Input ── */}
                <View>
                    <Text style={styles.inputLabel}>{t("settings.changePassword.newPasswordLabel")}</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="key-outline" size={18} color={Colors.textMuted} style={styles.inputIconLeft} />
                        <TextField
                            style={styles.textFieldOverride}
                            placeholder={t("settings.changePassword.newPasswordPlaceholder")}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={secureNew}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            onPress={() => setSecureNew((prev) => !prev)}
                            style={styles.inputIconRight}
                            activeOpacity={0.7}>
                            <Ionicons
                                name={secureNew ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color={Colors.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Confirm New Password Input ── */}
                <View>
                    <Text style={styles.inputLabel}>{t("settings.changePassword.newPasswordRepeatLabel")}</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="key-outline" size={18} color={Colors.textMuted} style={styles.inputIconLeft} />
                        <TextField
                            style={styles.textFieldOverride}
                            placeholder={t("settings.changePassword.newPasswordRepeatPlaceholder")}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={secureConfirm}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            onPress={() => setSecureConfirm((prev) => !prev)}
                            style={styles.inputIconRight}
                            activeOpacity={0.7}>
                            <Ionicons
                                name={secureConfirm ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color={Colors.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Password Requirements Callout ── */}
                <View style={styles.requirementsContainer}>
                    <View style={styles.requirementRow}>
                        <Ionicons
                            name={isMinLength ? "checkmark-circle" : "ellipse-outline"}
                            size={16}
                            color={isMinLength ? Colors.primary : Colors.textMuted}
                        />
                        <Text style={[styles.requirementText, isMinLength && styles.requirementTextSuccess]}>
                            {t("settings.changePassword.reqMinLength")}
                        </Text>
                    </View>
                    <View style={styles.requirementRow}>
                        <Ionicons
                            name={hasNumberOrSpecial ? "checkmark-circle" : "ellipse-outline"}
                            size={16}
                            color={hasNumberOrSpecial ? Colors.primary : Colors.textMuted}
                        />
                        <Text style={[styles.requirementText, hasNumberOrSpecial && styles.requirementTextSuccess]}>
                            {t("settings.changePassword.reqSpecialChar")}
                        </Text>
                    </View>
                    <View style={styles.requirementRow}>
                        <Ionicons
                            name={isNotSameAsCurrent ? "checkmark-circle" : "ellipse-outline"}
                            size={16}
                            color={isNotSameAsCurrent ? Colors.primary : Colors.textMuted}
                        />
                        <Text style={[styles.requirementText, isNotSameAsCurrent && styles.requirementTextSuccess]}>
                            {t("settings.changePassword.reqNotSame")}
                        </Text>
                    </View>
                </View>

                {/* ── Error & Match Alert Message ── */}
                {confirmPassword.length > 0 && !doPasswordsMatch && (
                    <Text style={styles.helperText}>{t("settings.changePassword.passwordMismatch")}</Text>
                )}
                {errorMessage && <Text style={styles.helperText}>{errorMessage}</Text>}
            </ScrollView>

            {/* ── Pinned Action Button ── */}
            <View style={styles.footer}>
                <Button
                    label={isLoading ? t("settings.changePassword.submitLoading") : t("settings.changePassword.submitButton")}
                    onPress={handleUpdatePassword}
                    disabled={!canSubmit || isLoading}
                    style={[styles.saveButton, (!canSubmit || isLoading) && styles.saveButtonDisabled]}
                    labelStyle={[styles.saveButtonLabel, (!canSubmit || isLoading) && styles.saveButtonLabelDisabled]}
                />
            </View>
        </View>
    );
}
