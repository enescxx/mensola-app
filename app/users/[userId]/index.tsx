import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileView from "@/components/Profile";
import { Colors } from "@/constants/colors";

export default function Profile() {
    return (
        <SafeAreaView style={styles.container}>
            <ProfileView />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 20,
    },
});
