import { RefreshControl, ScrollView, View } from "react-native";

import { styles } from "./styles";

import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileFooter from "./ProfileFooter";
import { useProfileContext } from "@/context/ProfileContext";
import { Colors } from "@/constants/colors";

export default function ProfileView() {
    const { refetch, isLoading } = useProfileContext();
    return (
        <ScrollView
            style={{ backgroundColor: Colors.background }}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={refetch}
                    tintColor={Colors.primary}
                    colors={[Colors.primary]}
                />
            }
            contentContainerStyle={styles.scrollContent}>
            <ProfileHeader />
            <View style={styles.divider} />
            <ProfileBody />
            <ProfileFooter />
        </ScrollView>
    );
}
