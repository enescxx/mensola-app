import React, { createContext, useContext } from "react";
import { ActivityIndicator, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, useRouter } from "expo-router";

import { useProfile } from "../hooks/profile/useProfile";
import { UserId } from "@/types/common.types";
import { STAT_ROUTE_MAP, StatTypeKey } from "@/types/stat.types";
import { IUser, UserFavorites, UserStats } from "@/types/user.types";

export interface ProfileContextType {
    userId?: UserId | "me";
    headerData: IUser & { stats: Partial<UserStats>; isOwnProfile: boolean };
    bodyData: UserFavorites;
    footerData: { stats: Partial<UserStats> };
    isOwnProfile: boolean;
    handleStatPress: (statType: StatTypeKey) => void;
    handleSeeAllPress: (type: "movies" | "tracks") => void;
    favorites: UserFavorites;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ userId, children }: { userId: UserId | "me"; children: React.ReactNode }) {
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

    const handleStatPress = (statType: StatTypeKey) => {
        const basePath = isOwnProfile ? "/me" : `/users/${userId}`;
        const fullPath = `${basePath}/${STAT_ROUTE_MAP[statType]}`;

        router.push(fullPath as Href);
    };

    const handleSeeAllPress = (type: "movies" | "tracks") => {
        const path = type === "movies" ? "/favorite-movies" : "/favorite-tracks";
        const basePath = isOwnProfile ? "/me" : `/users/${userId}`;
        const fullPath = `${basePath}${path}`;

        router.push(fullPath as Href);
    };

    const {
        id,
        username,
        fullname,
        bio,
        avatar,
        favoriteMovies,
        favoriteTracks,
        mutualFollowers,
        isFollowingByMe,
        ...stats
    } = profile;

    const activeHeaderStats = ["watchedMoviesCount", "followersCount", "followingCount"] as const;

    const headerStats = stats
        ? Object.fromEntries(activeHeaderStats.map((key) => [key as StatTypeKey, stats[key] ?? 0]))
        : {};

    const headerData = {
        id,
        username,
        fullname,
        bio,
        avatar,
        stats: headerStats,
        isOwnProfile,
    };
    const bodyData = {
        favoriteMovies: favoriteMovies?.slice(0, 3),
        favoriteTracks: favoriteTracks?.slice(0, 3),
    };
    const footerData = { stats };

    const favorites = {
        favoriteMovies,
        favoriteTracks,
    };

    return (
        <ProfileContext.Provider
            value={{
                userId,
                headerData,
                bodyData,
                footerData,
                isOwnProfile,
                handleStatPress,
                handleSeeAllPress,
                favorites,
            }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfileContext = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfileContext must be used within a ProfileProvider");
    }
    return context;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
        alignItems: "center",
    },
});
