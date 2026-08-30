import React from "react";
import {
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { router } from "expo-router";

import { Colors } from "@/constants/colors";
import { useHome } from "@/hooks/home/useHome";
import { HeroMovie, NowPlayingMovie, NewTrack } from "@/services/home.service";

import HomeHeader from "./HomeHeader";
import HeroCarousel from "./HeroCarousel";
import SectionHeader from "./SectionHeader";
import NowPlayingList from "./NowPlayingList";
import NewTracksList from "./NewTracksList";
import HomeSkeleton from "./HomeSkeleton";
import { styles } from "./styles";

export default function HomeScreen() {
    const { data, isLoading, error, refetch } = useHome();

    const handleHeroPress = (movie: HeroMovie) => {
        router.push(`/movies/${movie.tmdbId}?type=tmdb`);
    };

    const handleNowPlayingPress = (movie: NowPlayingMovie) => {
        router.push(`/movies/${movie.tmdbId}?type=tmdb`);
    };

    const handleTrackPress = (track: NewTrack) => {
        router.push(`/tracks/${track.spotifyId}?type=spotify`);
    };

    if (isLoading && !data) {
        return (
            <View style={styles.container}>
                <HomeHeader />
                <HomeSkeleton />
            </View>
        );
    }

    if (error && !data) {
        return (
            <View style={styles.container}>
                <HomeHeader />
                <View style={styles.errorWrapper}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={refetch} style={styles.retryBtn} activeOpacity={0.8}>
                        <Text style={styles.retryText}>Tekrar Dene</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <HomeHeader onNotificationPress={() => router.push("/(tabs)/notifications")} />
            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={refetch}
                        tintColor={Colors.primary}
                        colors={[Colors.primary]}
                    />
                }>

                {data?.heroMovies && data.heroMovies.length > 0 && (
                    <HeroCarousel
                        movies={data.heroMovies}
                        onMoviePress={handleHeroPress}
                    />
                )}

                {data?.nowPlayingMovies && data.nowPlayingMovies.length > 0 && (
                    <View style={styles.section}>
                        <SectionHeader title="Vizyondakiler" />
                        <NowPlayingList movies={data.nowPlayingMovies} onPress={handleNowPlayingPress} />
                    </View>
                )}

                {data?.newTracks && data.newTracks.length > 0 && (
                    <View style={styles.section}>
                        <SectionHeader title="Yeni Çıkan Parçalar" />
                        <NewTracksList tracks={data.newTracks} onPress={handleTrackPress} />
                    </View>
                )}

                <View style={styles.bottomPad} />
            </ScrollView>
        </View>
    );
}
