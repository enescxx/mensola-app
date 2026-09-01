import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import Avatar from "@/components/Avatar";
import TextField from "@/components/TextField";
import { useEditProfile } from "@/hooks/profile/useEditProfile";
import { Colors } from "@/constants/colors";

export default function EditProfileScreen() {
    const {
        user,
        selectedImageUri,
        isAvatarRemoved,
        isLoading,
        fullname,
        setFullname,
        bio,
        setBio,
        pickImageHandler,
        removeAvatarHandler,
        submitEdit,
    } = useEditProfile();
    const { t } = useTranslation();
    const previewAvatarUrl = selectedImageUri || (!isAvatarRemoved ? user?.avatar : null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.cancelButton}
                    onPress={() => router.back()}
                    disabled={isLoading}>
                    <Text style={styles.cancelButtonText}>{t("profile.editProfile.cancelButton")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.saveButton, isLoading && styles.disabledButton]}
                    onPress={submitEdit}
                    disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color={Colors.textPrimary} />
                    ) : (
                        <Text style={styles.saveButtonText}>{t("profile.editProfile.saveButton")}</Text>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.avatarEditContainer}>
                    <Avatar
                        size={84}
                        url={previewAvatarUrl ?? undefined}
                        user={user}
                        name={fullname || user?.fullname || user?.username}
                    />

                    <View style={styles.avatarActions}>
                        <TouchableOpacity activeOpacity={0.7} onPress={pickImageHandler} style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>
                                {selectedImageUri
                                    ? t("profile.editProfile.cancelSelection")
                                    : user?.avatar && !isAvatarRemoved
                                      ? t("profile.editProfile.changePhoto")
                                      : t("profile.editProfile.selectPhoto")}
                            </Text>
                        </TouchableOpacity>

                        {user?.avatar && !isAvatarRemoved && (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={removeAvatarHandler}
                                style={[styles.actionButton, styles.deleteButton]}>
                                <Text style={styles.deleteButtonText}>{t("profile.editProfile.deletePhotoButton")}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <TextField
                        label={t("profile.editProfile.fullnameLabel")}
                        value={fullname}
                        onChangeText={setFullname}
                        placeholder={t("profile.editProfile.fullnamePlaceholder")}
                    />
                    <TextField
                        label={t("profile.editProfile.bioLabel")}
                        value={bio}
                        onChangeText={setBio}
                        placeholder={t("profile.editProfile.bioPlaceholder")}
                        multiline
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },
    cancelButton: {
        backgroundColor: Colors.surface,
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 12,
    },
    cancelButtonText: {
        color: Colors.textMuted,
        fontSize: 14,
        fontWeight: "600",
    },
    saveButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        minWidth: 80,
        alignItems: "center",
    },
    saveButtonText: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: "700",
    },
    disabledButton: {
        opacity: 0.6,
    },
    content: {
        flex: 1,
        paddingTop: 24,
    },
    avatarEditContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginBottom: 32,
        backgroundColor: Colors.surface,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    avatarActions: {
        flex: 1,
        gap: 8,
    },
    actionButton: {
        backgroundColor: Colors.surfaceLight,
        paddingVertical: 9,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    actionButtonText: {
        color: Colors.textPrimary,
        fontSize: 13,
        fontWeight: "600",
    },
    deleteButton: {
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 1,
        borderColor: "rgba(239, 68, 68, 0.2)",
    },
    deleteButtonText: {
        color: Colors.danger,
        fontSize: 13,
        fontWeight: "600",
    },
    formContainer: {
        gap: 8,
    },
});
