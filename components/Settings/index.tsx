import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ListGroup } from "../ListGroup";
import BottomSheet from "../BottomSheet";
import SettingsItem from "./SettingsItem";
import { SettingSection, OptionsSetting } from "./types";
import { styles } from "./styles";
import { Colors } from "@/constants/colors";
import { usePreferences } from "@/hooks/usePreferences";
import { useGlobalUser } from "@/context/AuthContext";
import { UserService } from "@/services/user.service";
import { AuthService } from "@/services/auth.service";

export const SETTINGS_CONFIG: SettingSection[] = [
    {
        id: "account",
        title: "Account",
        items: [
            {
                id: "update-username",
                type: "route",
                label: "Username",
                route: "/settings/account/update-username",
                value: "enescxx",
            },
            {
                id: "update-email",
                type: "route",
                label: "Email",
                route: "/settings/account/update-email",
                value: "enescx54@gmail.com",
            },
            {
                id: "update-password",
                type: "route",
                label: "Password",
                route: "/settings/account/update-password",
            },
        ],
    },
    {
        id: "preferences",
        title: "Preferences",
        items: [
            {
                id: "theme",
                type: "options",
                label: "Appearance (Coming Soon)",
                value: "dark",
                options: [
                    { label: "Dark", value: "dark" },
                    { label: "Light", value: "light" },
                    { label: "System", value: "system" },
                ],
            },
            {
                id: "default-tab",
                type: "options",
                label: "Landing Tab",
                description: "Choose which shelf to show on app launch",
                value: "movies",
                options: [
                    { label: "Films", value: "movies" },
                    { label: "Music", value: "tracks" },
                ],
            },
            {
                id: "shelf-layout",
                type: "options",
                label: "Display Layout (Coming Soon)",
                description: "How your shelves are presented",
                value: "grid",
                options: [
                    { label: "Grid", value: "grid" },
                    { label: "List", value: "list" },
                ],
            },
        ],
    },
    {
        id: "privacy",
        title: "Privacy",
        items: [
            {
                id: "is-private",
                type: "toggle",
                label: "Private Profile",
                description: "Only approved followers can see your shelves",
                value: false,
            },
        ],
    },
    {
        id: "data-danger-zone",
        title: "Account Actions",
        items: [
            {
                id: "logout",
                type: "action",
                label: "Sign Out",
                description: "Log out of your account",
                actionKey: "LOGOUT",
                variant: "default",
            },
            {
                id: "delete-account",
                type: "action",
                label: "Delete Account",
                description: "Permanently remove your account and all shelves",
                actionKey: "DELETE_USER_ACCOUNT",
                variant: "danger",
            },
        ],
    },
];

export default function SettingsView() {
    const theme = usePreferences((state) => state.theme);
    const defaultTab = usePreferences((state) => state["default-tab"]);
    const shelfLayout = usePreferences((state) => state["shelf-layout"]);
    const setPreference = usePreferences((state) => state.setPreference);

    const { user, setUser } = useGlobalUser();
    const router = useRouter();

    const [activeOptionsSetting, setActiveOptionsSetting] = useState<OptionsSetting | null>(null);
    const [isSheetVisible, setIsSheetVisible] = useState(false);

    // Compute sections configurations dynamically using state, global user, and Zustand store values
    const sections: SettingSection[] = SETTINGS_CONFIG.map((section) => {
        if (section.id === "account") {
            return {
                ...section,
                items: section.items.map((item) => {
                    if (item.id === "update-username" && item.type === "route") {
                        return { ...item, value: user?.username };
                    }
                    if (item.id === "update-email" && item.type === "route") {
                        return { ...item, value: user?.email };
                    }
                    return item;
                }),
            };
        }
        if (section.id === "preferences") {
            return {
                ...section,
                items: section.items.map((item) => {
                    if (item.id === "theme" && item.type === "options") {
                        return { ...item, value: theme };
                    }
                    if (item.id === "default-tab" && item.type === "options") {
                        return { ...item, value: defaultTab };
                    }
                    if (item.id === "shelf-layout" && item.type === "options") {
                        return { ...item, value: shelfLayout };
                    }
                    return item;
                }),
            };
        }
        if (section.id === "privacy") {
            return {
                ...section,
                items: section.items.map((item) => {
                    if (item.id === "is-private" && item.type === "toggle") {
                        return { ...item, value: !!user?.isPrivate };
                    }
                    return item;
                }),
            };
        }
        return section;
    });

    const handleToggleChange = async (itemId: string, newValue: boolean) => {
        if (itemId === "is-private") {
            if (!user) return;

            // Optimistic update
            setUser({ ...user, isPrivate: newValue });

            try {
                await UserService.updatePrivacy(newValue);
            } catch (error) {
                // Revert state on failure
                setUser({ ...user, isPrivate: !newValue });

                Alert.alert(
                    "Hata",
                    "Gizlilik ayarı güncellenemedi. Lütfen tekrar deneyin."
                );
            }
        } else {
            setPreference(itemId as any, newValue);
        }
    };

    const handleOptionSelect = (itemId: string, newValue: string) => {
        setPreference(itemId as any, newValue);
    };

    const handleOptionPress = (item: OptionsSetting) => {
        // Find current dynamic settings value from computed sections
        let currentItem: OptionsSetting | undefined;
        for (const section of sections) {
            const found = section.items.find((i) => i.id === item.id);
            if (found && found.type === "options") {
                currentItem = found;
                break;
            }
        }
        setActiveOptionsSetting(currentItem || item);
        setIsSheetVisible(true);
    };

    const handleActionPress = (actionKey: string) => {
        if (actionKey === "EXPORT_USER_DATA") {
            Alert.alert(
                "Export Data",
                "Are you sure you want to export your data?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Export",
                        onPress: () => {
                            Alert.alert("Success", "Your data has been exported successfully.");
                        },
                    },
                ]
            );
        } else if (actionKey === "LOGOUT") {
            Alert.alert(
                "Sign Out",
                "Are you sure you want to sign out?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Sign Out",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                const refreshToken = await AsyncStorage.getItem("refreshToken");
                                if (refreshToken) {
                                    await AuthService.logout({ refreshToken });
                                }
                            } catch (e) {
                                console.error("Backend logout failed:", e);
                            } finally {
                                try {
                                    await AsyncStorage.multiRemove(["token", "refreshToken"]);
                                    setUser(undefined);
                                    router.replace("/login");
                                } catch (e) {
                                    console.error("Error signing out locally:", e);
                                }
                            }
                        },
                    },
                ]
            );
        } else if (actionKey === "DELETE_USER_ACCOUNT") {
            Alert.alert(
                "Hesabı Sil",
                "Hesabınız 30 gün boyunca askıya alınacaktır. Bu süre zarfında tekrar giriş yaparak hesabınızı yeniden etkinleştirebilirsiniz. 30 günün sonunda hesabınız ve tüm verileriniz kalıcı olarak silinecektir. Hesabınızı silmek istediğinize emin misiniz?",
                [
                    { text: "İptal", style: "cancel" },
                    {
                        text: "Sil",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                await UserService.deleteAccount();
                                await AsyncStorage.multiRemove(["token", "refreshToken"]);
                                setUser(undefined);
                                router.replace("/login");
                            } catch (e) {
                                console.error("Error deleting account:", e);
                                Alert.alert("Hata", "Hesap silinemedi. Lütfen daha sonra tekrar deneyiniz.");
                            }
                        },
                    },
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
                {sections.map((section) => (
                    <ListGroup key={section.id} title={section.title}>
                        {section.items.map((item, index) => {
                            const isFirst = index === 0;
                            const isLast = index === section.items.length - 1;
                            return (
                                <SettingsItem
                                    key={item.id}
                                    item={item}
                                    isFirst={isFirst}
                                    isLast={isLast}
                                    onToggle={handleToggleChange}
                                    onOptionPress={handleOptionPress}
                                    onActionPress={handleActionPress}
                                />
                            );
                        })}
                    </ListGroup>
                ))}
            </ScrollView>

            <BottomSheet
                isVisible={isSheetVisible}
                onClose={() => setIsSheetVisible(false)}
                title={activeOptionsSetting?.label || "Select Option"}
                showCloseButton
            >
                {activeOptionsSetting && (
                    <View style={styles.sheetOptionList}>
                        {activeOptionsSetting.options.map((option, index) => {
                            const isSelected = activeOptionsSetting.value === option.value;
                            const isLast = index === activeOptionsSetting.options.length - 1;
                            return (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[styles.sheetOptionItem, isLast && styles.sheetOptionItemLast]}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        handleOptionSelect(activeOptionsSetting.id, option.value);
                                        setIsSheetVisible(false);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.sheetOptionText,
                                            isSelected && styles.sheetOptionTextActive,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                    {isSelected && <Ionicons name="checkmark" size={20} color={Colors.primary} />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            </BottomSheet>
        </View>
    );
}
