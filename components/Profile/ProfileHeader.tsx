import { View, Image, TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";
import { IProfileHeaderProps } from "./types";
import ProfileStats from "./ProfileStats";

export default function ProfileHeader({ userData }: IProfileHeaderProps) {
    return (
        <View style={styles.headerContent}>
            <View style={styles.headerTopRow}>
                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: userData.profilePictureUrl }}
                        style={styles.profilePicture}
                    />
                </View>
                <View style={styles.rightInfoContainer}>
                    <View style={styles.nameWrapper}>
                        {userData.fullname ? (
                            <Text style={styles.fullnameLabel}>
                                {userData.fullname}
                            </Text>
                        ) : null}
                        <Text style={styles.usernameLabel}>
                            @{userData.username}
                        </Text>
                    </View>
                    <ProfileStats statsData={userData.stats} />
                </View>
            </View>
            {userData.bio ? (
                <Text style={styles.userBio}>{userData.bio}</Text>
            ) : null}
        </View>
    );
}
