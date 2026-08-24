import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

import { styles } from "./styles";
import ProfileStats from "./ProfileStats";

import { useProfileContext } from "../../context/ProfileContext";
import { useFollow } from "@/hooks/user/useFollow";
import { shareUserProfile } from "@/utils/share";
import { useRouter } from "expo-router";
import Avatar from "../Avatar";

export default function ProfileHeader() {
    const router = useRouter();
    const { headerData, handleStatPress } = useProfileContext();
    const { followHandler, unfollowHandler, isLoading, error } = useFollow();

    return (
        <View style={styles.headerContent}>
            <View style={styles.headerTopRow}>
                <Avatar url={headerData.avatar} user={headerData} size={140} />
                <View style={styles.rightInfoContainer}>
                    <View style={styles.nameWrapper}>
                        {headerData.fullname ? <Text style={styles.fullnameLabel}>{headerData.fullname}</Text> : null}
                        <Text style={styles.usernameLabel}>@{headerData.username}</Text>
                    </View>
                    <ProfileStats stats={headerData.stats} onStatPress={handleStatPress} />
                </View>
            </View>
            {headerData.bio ? <Text style={styles.userBio}>{headerData.bio}</Text> : null}
            <View style={styles.actionButtonContainer}>
                {headerData.isOwnProfile ? (
                    <TouchableOpacity onPress={() => router.push("/me/edit")} style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Profili Düzenle</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.actionButton, !headerData.isFollowingByMe && { backgroundColor: "#1DB954" }]}
                        onPress={async () => {
                            if (!isLoading) {
                                if (!headerData.isFollowingByMe)
                                    await followHandler(headerData.id, () => {
                                        headerData.isFollowingByMe = !headerData.isFollowingByMe;
                                    });
                                else {
                                    Alert.alert(
                                        "Takipten çıkılıyor",
                                        `${headerData.fullname || headerData.username} adlı kişiyi takip etmeyi bırakmak istiyor musunuz?`,
                                        [
                                            { text: "Hayır", onPress: () => {}, style: "cancel" },
                                            {
                                                text: "Evet",
                                                onPress: () => {
                                                    unfollowHandler(
                                                        headerData.id,
                                                        () =>
                                                            (headerData.isFollowingByMe = !headerData.isFollowingByMe),
                                                    );
                                                },
                                            },
                                        ],
                                    );
                                }
                            }
                        }}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.actionButtonText}>
                                {headerData.isFollowingByMe ? "Takip Ediliyor" : "Takip Et"}
                            </Text>
                        )}
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    onPress={async () => await shareUserProfile({ id: headerData.id, username: headerData.username })}
                    style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Profili Paylaş</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
