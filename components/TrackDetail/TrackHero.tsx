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
import { ITrackHeroProps } from "./types";

export default function TrackHero({
    trackDetails,
    toggleLike,
    onCommentPress,
    onAddPress,
    onPlayPress,
}: ITrackHeroProps) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(false);

    if (!trackDetails) return null;

    const artistName = trackDetails.artists && trackDetails.artists.length > 0 ? trackDetails.artists[0].name : "";
    const likesCount = trackDetails.likesCount || 0;
    const commentsCount = trackDetails.commentsCount || 0;
    
    const userRating = trackDetails?.currentUserInteraction?.rating
        ? Number(trackDetails.currentUserInteraction.rating)
        : 0;
    const userComment = trackDetails?.currentUserInteraction?.comment?.content || "";
    const hasUserInteraction = userRating > 0 || (typeof userComment === "string" && userComment.trim().length > 0);

    const handleTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
        if (e.nativeEvent.lines.length > 2 && !isDescriptionTruncated) {
            setIsDescriptionTruncated(true);
        }
    };

    return (
        <>
            <View style={styles.heroBanner}>
                {trackDetails.image ? (
                    <ImageBackground style={styles.bannerBackgroundImg} source={{ uri: trackDetails.image }}>
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
                        {trackDetails.image ? (
                            <Image source={{ uri: trackDetails.image }} style={styles.poster} resizeMode="cover" />
                        ) : (
                            <View style={[styles.poster, styles.posterPlaceholder]}>
                                <Ionicons name="musical-note-outline" size={36} color="#666" />
                            </View>
                        )}
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.movieTitle} numberOfLines={2}>
                                {trackDetails.title}
                            </Text>
                        </View>

                        {trackDetails.artists && trackDetails.artists.length > 0 && (
                            <TouchableOpacity style={styles.creatorContainer} activeOpacity={0.8}>
                                {trackDetails.artists[0].avatar ? (
                                    <Image source={{ uri: trackDetails.artists[0].avatar }} style={styles.avatar} />
                                ) : (
                                    <View style={[styles.avatar, styles.avatarPlaceholder]}>
                                        <Text style={styles.avatarLetter}>
                                            {(artistName || "U").charAt(0).toUpperCase()}
                                        </Text>
                                    </View>
                                )}
                                <Text style={styles.creatorName} numberOfLines={1}>
                                    {artistName}
                                </Text>
                            </TouchableOpacity>
                        )}

                        <View style={styles.movieStats}>
                            <Badge icon={<Ionicons name="heart" size={12} color="#FF8000" />} value={likesCount} />
                            <Badge icon={<Entypo name="text" size={12} color="#FF8000" />} value={commentsCount} />
                        </View>

                        <View style={styles.actionBar}>
                            {/* Dinle */}
                            <ActionButton
                                icon="play"
                                isActive={false}
                                activeColor="#1DB95466"
                                onPress={onPlayPress || (() => {})}
                            />

                            {/* Ekle */}
                            <ActionButton
                                icon="add-outline"
                                isActive={false}
                                activeColor="#8B5CF666"
                                onPress={onAddPress || (() => {})}
                            />

                            {/* Beğen */}
                            <ActionButton
                                icon="heart"
                                isActive={!!trackDetails.isLiked}
                                activeColor="#FF3B3066"
                                onPress={toggleLike}
                            />

                            {/* Oyla / Yorum Yap */}
                            <ActionButton
                                icon="star"
                                isActive={hasUserInteraction}
                                activeColor="#FFCC0066"
                                onPress={onCommentPress || (() => {})}
                            />
                        </View>
                    </View>
                </View>
            </View>

            {/* Description */}
            {trackDetails.description ? (
                <View style={styles.descriptionSection}>
                    <Text
                        style={styles.description}
                        numberOfLines={isDescriptionExpanded ? undefined : 2}
                        onTextLayout={handleTextLayout}>
                        {trackDetails.description}
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
