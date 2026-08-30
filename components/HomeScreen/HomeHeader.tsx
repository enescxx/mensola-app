import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { IHomeHeaderProps } from "./types";
import { headerStyles } from "./styles";

export default function HomeHeader({ onNotificationPress }: IHomeHeaderProps) {
    return (
        <View style={headerStyles.header}>
            <View style={headerStyles.logoGroup}>
                <Text style={headerStyles.logoText}>mensola</Text>
                <View style={headerStyles.logoDot} />
            </View>
            <TouchableOpacity
                onPress={onNotificationPress}
                activeOpacity={0.7}
                style={headerStyles.iconBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>
        </View>
    );
}
