import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ISectionHeaderProps } from "./types";
import { sectionHeaderStyles } from "./styles";

export default function SectionHeader({ title, onSeeAll, seeAllLabel = "Tümü" }: ISectionHeaderProps) {
    return (
        <View style={sectionHeaderStyles.row}>
            <Text style={sectionHeaderStyles.title}>{title}</Text>
            {onSeeAll && (
                <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text style={sectionHeaderStyles.seeAll}>{seeAllLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
