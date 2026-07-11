import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileView from "../../components/Profile";

const MOCK_USER = {
    id: "user-id",
    fullname: "Enes Can",
    username: "enescxx",
    bio: "mensola user",
    profilePictureUrl: "https://example.com/profile-picture.jpg",
    stats: [
        { type: "movieNumber", value: 147, label: "Film" },
        { type: "followers", value: 38, label: "Takipçi" },
        { type: "following", value: 47, label: "Takip" }
    ]
};

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
