import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileView from "../../../components/Profile";

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
        backgroundColor: "#121212",
        paddingTop: 20
    }
});
