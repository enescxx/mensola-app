import { View, Image, TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";
import ProfileStats from "./ProfileStats";

import { useProfileContext } from "../../context/ProfileContext";

export default function ProfileHeader() {
    const { headerData, handleStatPress } = useProfileContext();

    return (
        <View style={styles.headerContent}>
            <View style={styles.headerTopRow}>
                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: headerData.avatar }}
                        style={styles.profilePicture}
                    />
                </View>
                <View style={styles.rightInfoContainer}>
                    <View style={styles.nameWrapper}>
                        {headerData.fullname ? (
                            <Text style={styles.fullnameLabel}>
                                {headerData.fullname}
                            </Text>
                        ) : null}
                        <Text style={styles.usernameLabel}>
                            @{headerData.username}
                        </Text>
                    </View>
                    <ProfileStats
                        stats={headerData.stats}
                        onStatPress={handleStatPress}
                    />
                </View>
            </View>
            {headerData.bio ? (
                <Text style={styles.userBio}>{headerData.bio}</Text>
            ) : null}
        </View>
    );
}
