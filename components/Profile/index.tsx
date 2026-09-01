import { RefreshControl, ScrollView, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";

import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileFooter from "./ProfileFooter";
import { useProfileContext } from "@/context/ProfileContext";
import { Colors } from "@/constants/colors";

export default function ProfileView() {
    const { refetch, isLoading, hasAccess } = useProfileContext();
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
            
            {hasAccess ? (
                <>
                    <ProfileBody />
                    <ProfileFooter />
                </>
            ) : (
                <View style={styles.privateContainer}>
                    <Ionicons name="lock-closed-outline" size={48} color={Colors.textSecondary} />
                    <Text style={styles.privateText}>Bu hesap gizli</Text>
                    <Text style={styles.privateSubText}>
                        Fotoğraflarını ve listelerini görmek için bu hesabı takip et.
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}
