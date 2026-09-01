import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { Colors } from "@/constants/colors";
import { useChangeUsername } from "@/hooks/user/useChangeUsername";
import { useTranslation } from "react-i18next";

import { styles } from "./styles";
import { IChangeUsernameProps, UsernameStatus } from "./types";

// ── Status indicator icon ─────────────────────────────────────────────────────
function StatusIcon({ status }: { status: UsernameStatus }) {
    switch (status) {
        case "checking":
            return <ActivityIndicator size="small" color={Colors.textMuted} />;
        case "available":
            return <Ionicons name="checkmark-circle" size={20} color={Colors.success} />;
        case "taken":
        case "invalid":
            return <Ionicons name="close-circle" size={20} color={Colors.danger} />;
        default:
            return null;
    }
}

export default function ChangeUsername({
    currentUsername,
    currentFullname,
    currentAvatar,
    userId,
    onSuccess,
}: IChangeUsernameProps) {
    const { t } = useTranslation();
    const {
        value,
        status,
        isSaving,
        errorMessage,
        previewHandle,
        canSave,
        handleChange,
        handleSave,
    } = useChangeUsername({ currentUsername, onSuccess });

    const helperMessage =
        status === "available"
            ? t("settings.changeUsername.statusAvailable")
            : status === "taken"
              ? t("settings.changeUsername.statusTaken")
              : status === "invalid" && value.length > 0
                ? t("settings.changeUsername.statusInvalid")
                : null;

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                {/* ── Live Preview Card ── */}
                <View style={styles.previewCard}>
                    <Avatar
                        url={currentAvatar}
                        name={currentFullname || currentUsername}
                        user={
                            userId
                                ? ({ id: userId, username: currentUsername, fullname: currentFullname } as any)
                                : undefined
                        }
                        size={52}
                    />
                    <View style={styles.previewText}>
                        <Text style={styles.previewName} numberOfLines={1}>
                            {currentFullname || currentUsername}
                        </Text>
                        <Text style={styles.previewHandle} numberOfLines={1}>
                            @{previewHandle}
                        </Text>
                    </View>
                </View>

                {/* ── Public URL Row ── */}
                <View style={styles.urlRow}>
                    <Ionicons name="link-outline" size={13} color={Colors.textMuted} />
                    <Text style={styles.urlText}>mensola.app/@{previewHandle}</Text>
                </View>

                {/* ── Username Input ── */}
                <View style={styles.inputContainer}>
                    <Text style={styles.atSymbol}>@</Text>
                    <TextField
                        style={styles.textFieldOverride}
                        placeholder={currentUsername}
                        value={value}
                        onChangeText={handleChange}
                        error={status === "taken" || status === "invalid" ? " " : undefined}
                        maxLength={20}
                        returnKeyType="done"
                    />
                    <View style={styles.statusIcon}>
                        <StatusIcon status={status} />
                    </View>
                </View>

                {/* ── Helper / error text ── */}
                {(helperMessage || errorMessage) && (
                    <Text
                        style={[
                            styles.helperText,
                            status === "available" && !errorMessage ? styles.helperAvailable : styles.helperTaken,
                        ]}>
                        {errorMessage || helperMessage}
                    </Text>
                )}

                {/* ── Guidelines Card ── */}
                <View style={styles.guidelinesCard}>
                    <View style={styles.guidelinesHeader}>
                        <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
                        <Text style={styles.guidelinesTitle}>{t("settings.changeUsername.guidelinesTitle")}</Text>
                    </View>

                    <View style={styles.bulletRow}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.bulletText}>
                            {t("settings.changeUsername.guidelineChangeFreqStart")}<Text style={styles.bulletHighlight}>{t("settings.changeUsername.guideline1")}</Text>
                            {t("settings.changeUsername.guidelineChangeFreqEnd")}
                        </Text>
                    </View>

                    <View style={styles.bulletRow}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.bulletText}>
                            {t("settings.changeUsername.guidelineAllowedChars")}
                            <Text style={styles.bulletHighlight}>{t("settings.changeUsername.guideline2")}</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* ── Pinned Save Button ── */}
            <View style={styles.footer}>
                <Button
                    label={isSaving ? t("settings.changeUsername.submitLoading") : t("settings.changeUsername.submitButton")}
                    onPress={handleSave}
                    disabled={!canSave}
                    style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
                    labelStyle={[styles.saveButtonLabel, !canSave && styles.saveButtonLabelDisabled]}
                />
            </View>
        </View>
    );
}
