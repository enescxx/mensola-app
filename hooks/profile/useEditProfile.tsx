import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useGlobalUser } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { ProfileService } from "@/services/profile.service";

export const useEditProfile = () => {
    const { user, setUser } = useGlobalUser();
    const { t } = useTranslation();

    const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
    const [isAvatarRemoved, setIsAvatarRemoved] = useState(false);
    const [fullname, setFullname] = useState(user?.fullname || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [isLoading, setIsLoading] = useState(false);

    const pickImageHandler = async () => {
        if (selectedImageUri) {
            setSelectedImageUri(null);
        } else {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert(t("profile.editProfile.photoPermissionErrorTitle"), t("profile.editProfile.photoPermissionErrorBody"));
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                setSelectedImageUri(result.assets[0].uri);
                setIsAvatarRemoved(false);
            }
        }
    };

    const removeAvatarHandler = () => {
        Alert.alert(t("profile.editProfile.removePhotoConfirmTitle"), t("profile.editProfile.removePhotoConfirmBody"), [
            { text: t("profile.editProfile.giveUp"), style: "cancel" },
            {
                text: t("profile.editProfile.remove"),
                style: "destructive",
                onPress: () => {
                    setSelectedImageUri(null);
                    setIsAvatarRemoved(true);
                },
            },
        ]);
    };

    const submitEdit = async () => {
        const isNameChanged = fullname !== (user?.fullname || "");
        const isBioChanged = bio !== (user?.bio || "");
        const hasNewImage = Boolean(selectedImageUri);

        if (!isNameChanged && !isBioChanged && !hasNewImage && !isAvatarRemoved) {
            Alert.alert(t("profile.editProfile.noChangesTitle"), t("profile.editProfile.noChangesBody"));
            return;
        }

        setIsLoading(true);

        try {
            let finalAvatarUrl: string | null | undefined = user?.avatar?.toString();

            if (selectedImageUri) {
                const uploadResponse = await ProfileService.uploadAvatar(selectedImageUri);
                finalAvatarUrl = uploadResponse.data?.avatarUrl;
            } else if (isAvatarRemoved) {
                finalAvatarUrl = null;
            }

            const response = await ProfileService.editProfile({
                fullname: fullname.trim() || undefined,
                bio: bio.trim() || undefined,
                avatar: finalAvatarUrl as any,
            });

            if (response.data?.user) {
                setUser({ ...user, ...response.data.user });
            }

            Alert.alert(t("profile.editProfile.successTitle"), t("profile.editProfile.successBody"), [{ text: t("common.ok"), onPress: () => router.back() }]);
        } catch (error) {
            Alert.alert(t("profile.editProfile.errorTitle"), t("profile.editProfile.errorBody"));
        } finally {
            setIsLoading(false);
        }
    };

    return {
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
    };
};
