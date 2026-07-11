import { View, Image, TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";
import { IProfileViewProps } from "./types";
import ProfileHeader from "./ProfileHeader";

export default function ProfileView({
    userData,
    isOwnProfile = false
}: IProfileViewProps) {
    return (
        <View>
            <ProfileHeader userData={userData} />
        </View>
    );
}
