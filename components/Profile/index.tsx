import { ScrollView } from "react-native";

import { styles } from "./styles";
import { IProfileViewProps } from "./types";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileFooter from "./ProfileFooter";

export default function ProfileView({
    userData,
    isOwnProfile = false
}: IProfileViewProps) {
    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <ProfileHeader userData={userData} />
            <ProfileBody
                favoriteMovies={userData.favoriteMovies}
                favoriteSongs={userData.favoriteSongs}
            />
            <ProfileFooter />
        </ScrollView>
    );
}
