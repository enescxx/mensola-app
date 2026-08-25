import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import ProfileStats from "./ProfileStats";

import { useProfileContext } from "../../context/ProfileContext";
import { useFollow } from "@/hooks/user/useFollow";
import { shareUserProfile } from "@/utils/share";
import { useRouter } from "expo-router";
import Avatar from "../Avatar";
import { Colors } from "@/constants/colors";

export default function ProfileHeader() {
    const router = useRouter();
    const { headerData, handleStatPress } = useProfileContext();
    const { followHandler, unfollowHandler, isLoading } = useFollow();

    const isFollowing = headerData.isFollowingByMe;

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
                        <Text style={styles.actionButtonText}>Profili Düzenle</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[
                            styles.actionButton,
                            isFollowing ? styles.actionButtonFollowing : styles.actionButtonPrimary,
                        ]}
                        onPress={async () => {
                            if (isLoading) return;
                            if (!isFollowing) {
                                await followHandler(headerData.id, () => {
                                    headerData.isFollowingByMe = true;
                                });
                            } else {
                                Alert.alert(
                                    "Takipten çıkılıyor",
                                    `${headerData.fullname || headerData.username} adlı kişiyi takip etmeyi bırakmak istiyor musunuz?`,
                                    [
                                        { text: "Hayır", style: "cancel" },
                                        {
                                            text: "Evet",
                                            onPress: () =>
                                                unfollowHandler(headerData.id, () => {
                                                    headerData.isFollowingByMe = false;
                                                }),
                                        },
                                    ],
                                );
                            }
                        }}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color={isFollowing ? Colors.primary : "#fff"} />
                        ) : (
                            <Text style={[styles.actionButtonText, !isFollowing && styles.actionButtonTextPrimary]}>
                                {isFollowing ? "Takip Ediliyor" : "Takip Et"}
                            </Text>
                        )}
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={async () => await shareUserProfile({ id: headerData.id, username: headerData.username })}
                    style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Paylaş</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
