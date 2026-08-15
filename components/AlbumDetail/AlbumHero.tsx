import { useState } from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    NativeSyntheticEvent,
    TextLayoutEventData,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Ionicons } from "@expo/vector-icons";

import ActionButton from "@/components/Movies/ActionButton";
import Badge from "@/components/Badge";
import { styles } from "./styles";
import { IAlbumHeroProps } from "./types";
import { shareAlbum } from "@/utils/share";

export default function AlbumHero({
    albumDetails,
    tracksCount,
    commentsCount,
    toggleLike,
    onCommentPress,
    onSharePress,
    onPlayPress,
}: IAlbumHeroProps) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(false);

    if (!albumDetails) return null;

    const artist = albumDetails.artists && albumDetails.artists.length > 0 ? albumDetails.artists[0] : null;
    const artistName = artist ? artist.name : "";
    const likesCount = albumDetails.likesCount || 0;
    const userRating = albumDetails?.currentUserInteraction?.rating
        ? Number(albumDetails.currentUserInteraction.rating)
        : 0;
    const userComment = albumDetails?.currentUserInteraction?.comment?.content || "";
    const hasUserInteraction = userRating > 0 || (typeof userComment === "string" && userComment.trim().length > 0);

    const handleTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
        if (e.nativeEvent.lines.length > 2 && !isDescriptionTruncated) {
            setIsDescriptionTruncated(true);
        }
    };

    const handleShare = async () => {
        if (onSharePress) {
            onSharePress();
            return;
        }

        if (!albumDetails) return;

        await shareAlbum({
            id: albumDetails.id,
            title: albumDetails.title,
        });
    };

    return (
        <>
            <View style={styles.heroBanner}>
                {albumDetails.image ? (
                    <ImageBackground style={styles.bannerBackgroundImg} source={{ uri: albumDetails.image }}>
                        <LinearGradient
                            colors={["transparent", "rgba(18, 18, 18, 0.8)", "#121212"]}
                            style={styles.bannerGradient}
                        />
                    </ImageBackground>
                ) : (
                    <View style={[styles.bannerBackgroundImg, { backgroundColor: "#1e1e1e" }]}>
                        <LinearGradient
                            colors={["transparent", "rgba(18, 18, 18, 0.8)", "#121212"]}
                            style={styles.bannerGradient}
                        />
                    </View>
                )}

                <View style={styles.bannerContent}>
                    <View style={styles.posterWrapper}>
                        {albumDetails.image ? (
                            <Image source={{ uri: albumDetails.image }} style={styles.poster} resizeMode="cover" />
                        ) : (
                            <View style={[styles.poster, styles.posterPlaceholder]}>
                                <Ionicons name="disc-outline" size={36} color="#666" />
                            </View>
                        )}
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.movieTitle} numberOfLines={2}>
                                {albumDetails.title}
                            </Text>
                        </View>

                        {artist && (
                            <TouchableOpacity style={styles.creatorContainer} activeOpacity={0.8}>
                                {artist.avatar ? (
                                    <Image source={{ uri: artist.avatar }} style={styles.avatar} />
                                ) : (
                                    <View style={[styles.avatar, styles.avatarPlaceholder]}>
                                        <Text style={styles.avatarLetter}>
                                            {(artistName || "A").charAt(0).toUpperCase()}
                                        </Text>
                                    </View>
                                )}
                                <Text style={styles.creatorName} numberOfLines={1}>
                                    {artistName}
                                </Text>
                            </TouchableOpacity>
                        )}

                        <View style={styles.movieStats}>
                            <Badge
                                icon={<Ionicons name="musical-note-outline" size={12} color="#FF8000" />}
                                value={tracksCount}
                            />
                            <Badge icon={<Ionicons name="heart" size={12} color="#FF8000" />} value={likesCount} />
                            <Badge icon={<Entypo name="text" size={12} color="#FF8000" />} value={commentsCount ?? 0} />
                        </View>

                        <View style={styles.actionBar}>
                            {/* 1. Dinle */}
                            <ActionButton
                                icon="play"
                                isActive={false}
                                activeColor="#1DB95466"
                                onPress={onPlayPress || (() => {})}
                            />

                            {/* 2. Paylaş */}
                            <ActionButton
                                icon="share-social-outline"
                                isActive={false}
                                activeColor="#38BDF866"
                                onPress={handleShare}
                            />

                            {/* 3. Beğen */}
                            <ActionButton
                                icon="heart"
                                isActive={!!albumDetails.isLiked}
                                activeColor="#FF3B3066"
                                onPress={toggleLike}
                            />

                            {/* 4. Oyla */}
                            <ActionButton
                                icon="star"
                                isActive={hasUserInteraction}
                                activeColor="#FFCC0066"
                                onPress={onCommentPress}
                            />
                        </View>
                    </View>
                </View>
            </View>

            {/* Description */}
            {albumDetails.description ? (
                <View style={styles.descriptionSection}>
                    <Text
                        style={styles.description}
                        numberOfLines={isDescriptionExpanded ? undefined : 2}
                        onTextLayout={handleTextLayout}>
                        {albumDetails.description}
                    </Text>

                    {(isDescriptionTruncated || isDescriptionExpanded) && (
                        <TouchableOpacity
                            onPress={() => setIsDescriptionExpanded((prev) => !prev)}
                            activeOpacity={0.7}
                            style={styles.readMoreButton}>
                            <Text style={styles.readMoreText}>{isDescriptionExpanded ? "Daha Az" : "Daha Fazla"}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : null}
        </>
    );
}
