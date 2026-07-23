import { createContext, useContext } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useProfile } from "../hooks/profile/useProfile";

const StatDetailPaths: Record<StatTypes, string> = {
    movieListCount: "/movie-lists",
    playlistCount: "/playlists",
    watchlistMoviesCount: "/watchlist",
    watchedMoviesCount: "/watched",
    likedMoviesCount: "/liked-movies",
    likedTracksCount: "/liked-tracks",
    likedPlaylistsCount: "/liked-playlists",
    likedMovieListsCount: "/liked-movie-lists",
    likedAlbumsCount: "/liked-albums",
    followerCount: "/followers",
    followingCount: "/following"
};

const ProfileContext = createContext(null);

export function ProfileProvider({ userId, children }) {
    const { profile, isLoading, error } = useProfile(userId);
    const router = useRouter();

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#1DB954" />
            </SafeAreaView>
        );
    }

    if (error || !profile) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ color: "#fff" }}>Kullanıcı bulunamadı.</Text>
            </SafeAreaView>
        );
    }

    const isOwnProfile = userId === "me";

    const handleStatPress = (statType: string) => {
        const path = StatDetailPaths[statType];
        if (!path) return;

        const basePath = isOwnProfile ? "/me" : `/users/${userId}`;
        router.push(`${basePath}${path}`);
    };

    const handleSeeAllPress = (type: "movies" | "tracks") => {
        const path =
            type === "movies" ? "/favorite-movies" : "/favorite-tracks";
        const basePath = isOwnProfile ? "/me" : `/users/${userId}`;

        router.push(`${basePath}${path}`);
    };

    const {
        id,
        username,
        fullname,
        bio,
        avatar,
        favoriteMovies,
        favoriteTracks,
        stats
    } = profile;

    const activeHeaderStats = [
        "watchedMoviesCount",
        "followerCount",
        "followingCount"
    ];
    const headerStats =
        stats?.filter(s => activeHeaderStats.includes(s.type)) || [];

    const headerData = {
        id,
        username,
        fullname,
        bio,
        avatar,
        stats: headerStats,
        isOwnProfile
    };
    const bodyData = {
        favoriteMovies: favoriteMovies?.slice(0, 3),
        favoriteTracks: favoriteTracks?.slice(0, 3)
    };
    const footerData = { stats };

    const favorites = {
        favoriteMovies,
        favoriteTracks
    };

    return (
        <ProfileContext.Provider
            value={{
                headerData,
                bodyData,
                footerData,
                isOwnProfile,
                handleStatPress,
                handleSeeAllPress,
                favorites
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfileContext = () => useContext(ProfileContext);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
        alignItems: "center"
    }
});
