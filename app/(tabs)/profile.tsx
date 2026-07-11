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
    ],
    favoriteMovies: [
        {
            title: "Movie 1",
            poster: "https://examle.com/poster1.jpg",
            interactions: { rating: "4.5", likes: true, reviews: true }
        },
        {
            title: "Movie 2",
            poster: "https://examle.com/poster2.jpg",
            interactions: { rating: "3", reviews: true }
        },
        {
            title: "Movie 3",
            poster: "https://examle.com/poster3.jpg",
            interactions: { rating: "5", likes: true }
        },
        {
            title: "Movie 3",
            poster: "https://examle.com/poster3.jpg",
            interactions: { rating: "4", likes: true, reviews: true }
        }
    ],
    favoriteSongs: [
        { title: "Song Name 1", artist: "Artist 1", duration: "3:47" },
        { title: "Song Name 2", artist: "Artist 2", duration: "4:13" },
        { title: "Song Name 3", artist: "Artist 3", duration: "2:19" },
        { title: "Song Name 4", artist: "Artist 4", duration: "3:21" }
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
