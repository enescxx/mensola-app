import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileView from "../../components/Profile";

import { MOCK_USER } from "../../mocks/userMock";

export default function Profile() {
    return (
        <SafeAreaView style={styles.container}>
            <ProfileView userData={MOCK_USER} isOwnProfile={true} />
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
