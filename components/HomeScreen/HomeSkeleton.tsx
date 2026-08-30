import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import { Colors } from "@/constants/colors";
import { skeletonStyles } from "./styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HERO_HEIGHT = 260;
const CARD_WIDTH = 120;
const TRACK_SIZE = 140;

function ShimmerBox({
    width,
    height,
    borderRadius = 12,
    style,
}: {
    width: number | string;
    height: number;
    borderRadius?: number;
    style?: object;
}) {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
                Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: true }),
            ]),
        ).start();
    }, [anim]);

    const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.55] });

    return (
        <Animated.View
            style={[
                {
                    width: width as number,
                    height,
                    borderRadius,
                    backgroundColor: Colors.surfaceLight,
                    opacity,
                },
                style,
            ]}
        />
    );
}

export default function HomeSkeleton() {
    return (
        <View style={skeletonStyles.wrapper}>
            <ShimmerBox width={SCREEN_WIDTH} height={HERO_HEIGHT} borderRadius={0} />

            <View style={skeletonStyles.dotsRow}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <ShimmerBox key={i} width={i === 0 ? 24 : 8} height={8} borderRadius={4} style={skeletonStyles.dot} />
                ))}
            </View>

            <View style={skeletonStyles.sectionHeader}>
                <ShimmerBox width={140} height={18} borderRadius={8} />
                <ShimmerBox width={40} height={14} borderRadius={6} />
            </View>

            <View style={skeletonStyles.row}>
                {[0, 1, 2, 3].map((i) => (
                    <View key={i} style={skeletonStyles.movieCardSkeleton}>
                        <ShimmerBox width={CARD_WIDTH} height={CARD_WIDTH * 1.5} borderRadius={10} />
                        <ShimmerBox width={CARD_WIDTH * 0.8} height={12} borderRadius={6} style={skeletonStyles.mt8} />
                        <ShimmerBox width={CARD_WIDTH * 0.55} height={10} borderRadius={5} style={skeletonStyles.mt4} />
                    </View>
                ))}
            </View>

            <View style={skeletonStyles.sectionHeader}>
                <ShimmerBox width={160} height={18} borderRadius={8} />
                <ShimmerBox width={40} height={14} borderRadius={6} />
            </View>

            <View style={skeletonStyles.row}>
                {[0, 1, 2, 3].map((i) => (
                    <View key={i} style={skeletonStyles.trackCardSkeleton}>
                        <ShimmerBox width={TRACK_SIZE} height={TRACK_SIZE} borderRadius={10} />
                        <ShimmerBox width={TRACK_SIZE * 0.8} height={12} borderRadius={6} style={skeletonStyles.mt8} />
                        <ShimmerBox width={TRACK_SIZE * 0.6} height={10} borderRadius={5} style={skeletonStyles.mt4} />
                    </View>
                ))}
            </View>
        </View>
    );
}
