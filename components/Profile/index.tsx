import { ScrollView } from "react-native";

import { styles } from "./styles";

import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileFooter from "./ProfileFooter";

export default function ProfileView() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <ProfileHeader />
            <ProfileBody />
            <ProfileFooter />
        </ScrollView>
    );
}
