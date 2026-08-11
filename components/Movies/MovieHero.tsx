import { ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient"
import { styles } from "./styles";
import MoviePoster from "./MoviePoster";
import Badge from "../Badge";
import { Entypo, Ionicons } from "@expo/vector-icons";
import ActionButton from "./ActionButton";

export default function MovieHero() {
    return (
        <View style={styles.heroBanner}>
            <ImageBackground
                style={styles.bannerBackgroundImg}
                source={{ uri: "aaa.jpg" }}>

                <LinearGradient
                    colors={["transparent", "rgba(18, 18, 18, 0.8)", "#121212"]}
                    style={styles.bannerGradient} />
            </ImageBackground>
            <View style={styles.bannerContent}>
                <MoviePoster />
                <View style={styles.infoContainer}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.movieTitle}>Movie Title</Text>
                        <Text style={styles.releaseDate}>(2026)</Text>
                    </View>
                    <View style={styles.metaWrapper}>
                        <Text style={styles.duration}>136 dk</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.genres}>Action, Sci-Fi</Text>
                    </View>
                    <View style={styles.movieStats}>
                        <Badge icon={<Ionicons name="star" size={12} color="#FF8000" />} value={6.7} />
                        <Badge icon={<Ionicons name="heart" size={12} color="#FF8000" />} value={134} />
                        <Badge icon={<Entypo name="text" size={12} color="#FF8000" />} value={23853} />
                    </View>
                    <View style={styles.actionBar}>
                        <ActionButton icon="checkmark" isActive={true} activeColor="#1DB95466" />
                        <ActionButton icon="add" isActive={true} activeColor="#38BDF866" />
                        <ActionButton icon="heart" isActive={true} activeColor="#FF3B3066" />
                        <ActionButton icon="star" isActive={true} activeColor="#FFCC0066" />
                    </View>
                </View>
            </View>
        </View>
    )
}