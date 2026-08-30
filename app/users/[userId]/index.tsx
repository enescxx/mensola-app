import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileView from "@/components/Profile";
import { ProfileProvider } from "@/context/ProfileContext";
import { Colors } from "@/constants/colors";
import { UserId } from "@/types/common.types";

export default function Profile() {
    const { userId } = useLocalSearchParams<{ userId: UserId }>();
    return (
        <ProfileProvider userId={userId}>
            <SafeAreaView style={styles.container}>
                <ProfileView />
            </SafeAreaView>
        </ProfileProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 20,
    },
});
