import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import ProfileStats from "./ProfileStats";

import { useProfileContext } from "../../context/ProfileContext";
import { useFollow } from "@/hooks/user/useFollow";
import { shareUserProfile } from "@/utils/share";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Avatar from "../Avatar";
import { Colors } from "@/constants/colors";

export default function ProfileHeader() {
    const router = useRouter();
    const { t } = useTranslation();
    const { headerData, handleStatPress } = useProfileContext();
    const { followHandler, unfollowHandler, isLoading } = useFollow();

    const isFollowing = headerData.isFollowingByMe;
    const isPending = headerData.isPendingByMe;

    return (
        <View style={styles.headerWrapper}>
            <LinearGradient
                colors={[Colors.primary, Colors.secondary, Colors.accentPink]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 3, borderRadius: 999 }}>
                <View style={{ borderRadius: 999, overflow: "hidden", borderWidth: 2, borderColor: Colors.background }}>
                    <Avatar url={headerData.avatar} user={{ ...headerData }} size={84} />
                </View>
            </LinearGradient>

            <View style={styles.nameBlock}>
                {headerData.fullname ? <Text style={styles.fullnameLabel}>{headerData.fullname}</Text> : null}
                <Text style={styles.usernameLabel}>@{headerData.username}</Text>
            </View>

            {headerData.bio ? <Text style={styles.userBio}>{headerData.bio}</Text> : null}

            <ProfileStats stats={headerData.stats} onStatPress={handleStatPress} />

            <View style={styles.actionButtonContainer}>
                {headerData.isOwnProfile ? (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push("/me/edit")}
                        style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>{t("profile.header.editProfileButton")}</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[
                            styles.actionButton,
                            (isFollowing || isPending) ? styles.actionButtonFollowing : styles.actionButtonPrimary,
                        ]}
                        onPress={async () => {
                            if (isLoading) return;
                            if (isPending) {
                                Alert.alert(
                                    t("profile.header.cancelRequestTitle"),
                                    t("profile.header.cancelRequestBody", { name: headerData.fullname || headerData.username }),
                                    [
                                        { text: t("profile.header.no"), style: "cancel" },
                                        {
                                            text: t("profile.header.yes"),
                                            onPress: () =>
                                                unfollowHandler(headerData.id, () => {
                                                    headerData.isPendingByMe = false;
                                                }),
                                        },
                                    ],
                                );
                            } else if (isFollowing) {
                                Alert.alert(
                                    t("profile.header.unfollowConfirmTitle"),
                                    t("profile.header.unfollowConfirmBody", { name: headerData.fullname || headerData.username }),
                                    [
                                        { text: t("profile.header.no"), style: "cancel" },
                                        {
                                            text: t("profile.header.yes"),
                                            onPress: () =>
                                                unfollowHandler(headerData.id, () => {
                                                    headerData.isFollowingByMe = false;
                                                }),
                                        },
                                    ],
                                );
                            } else {
                                await followHandler(headerData.id, (data) => {
                                    if (data?.status === "pending" || headerData.isPrivate) {
                                        headerData.isPendingByMe = true;
                                    } else {
                                        headerData.isFollowingByMe = true;
                                    }
                                });
                            }
                        }}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color={(isFollowing || isPending) ? Colors.primary : "#fff"} />
                        ) : (
                            <Text style={[styles.actionButtonText, !(isFollowing || isPending) && styles.actionButtonTextPrimary]}>
                                {isFollowing
                                    ? t("profile.header.followingButton")
                                    : isPending
                                      ? t("profile.header.requestedButton")
                                      : t("profile.header.followButton")}
                            </Text>
                        )}
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={async () => await shareUserProfile({ id: headerData.id, username: headerData.username })}
                    style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>{t("profile.header.shareButton")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
