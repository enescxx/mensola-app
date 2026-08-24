import { RefreshControl, ScrollView } from "react-native";

import { styles } from "./styles";

import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileFooter from "./ProfileFooter";
import { useProfileContext } from "@/context/ProfileContext";

export default function ProfileView() {
    const { refetch, isLoading } = useProfileContext();
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#1DB954" colors={["#1DB954"]} />
            }
            contentContainerStyle={styles.scrollContent}>
            <ProfileHeader />
            <ProfileBody />
            <ProfileFooter />
        </ScrollView>
    );
}
