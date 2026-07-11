import { ScrollView } from "react-native";

import { styles } from "./styles";
import { IProfileViewProps } from "./types";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

export default function ProfileView({
    userData,
    isOwnProfile = false
}: IProfileViewProps) {
    return (
        <ScrollView>
            <ProfileHeader userData={userData} />
            <ProfileBody
                favoriteMovies={userData.favoriteMovies}
                favoriteSongs={userData.favoriteSongs}
            />
        </ScrollView>
    );
}
