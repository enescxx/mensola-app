import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import Avatar from "@/components/Avatar";
import TextField from "@/components/TextField";
import { useEditProfile } from "@/hooks/profile/useEditProfile";

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
    const previewAvatarUrl = selectedImageUri || (!isAvatarRemoved ? user?.avatar : null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.cancelButton}
                    onPress={() => router.back()}
                    disabled={isLoading}>
                    <Text style={styles.cancelButtonText}>İptal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.saveButton, isLoading && styles.disabledButton]}
                    onPress={submitEdit}
                    disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#000" />
                    ) : (
                        <Text style={styles.saveButtonText}>Kaydet</Text>
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
                                    ? "Seçimi İptal Et"
                                    : user?.avatar && !isAvatarRemoved
                                      ? "Fotoğrafı Değiştir"
                                      : "Fotoğraf Seç"}
                            </Text>
                        </TouchableOpacity>

                        {user?.avatar && !isAvatarRemoved && (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={removeAvatarHandler}
                                style={[styles.actionButton, styles.deleteButton]}>
                                <Text style={styles.deleteButtonText}>Mevcut Fotoğrafı Sil</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <TextField
                        label="Ad Soyad"
                        value={fullname}
                        onChangeText={setFullname}
                        placeholder="Adınızı girin"
                    />
                    <TextField
                        label="Biyografi"
                        value={bio}
                        onChangeText={setBio}
                        placeholder="Kendinizden bahsedin"
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
        backgroundColor: "#121212",
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },
    cancelButton: {
        backgroundColor: "#1e1e1e",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 12,
    },
    cancelButtonText: {
        color: "#9CA3AF",
        fontSize: 14,
        fontWeight: "600",
    },
    saveButton: {
        backgroundColor: "#1DB954",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        minWidth: 80,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
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
        backgroundColor: "#181818",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#262626",
    },
    avatarActions: {
        flex: 1,
        gap: 8,
    },
    actionButton: {
        backgroundColor: "#242424",
        paddingVertical: 9,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    actionButtonText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },
    deleteButton: {
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 1,
        borderColor: "rgba(239, 68, 68, 0.2)",
    },
    deleteButtonText: {
        color: "#EF4444",
        fontSize: 13,
        fontWeight: "600",
    },
    formContainer: {
        gap: 8,
    },
});
