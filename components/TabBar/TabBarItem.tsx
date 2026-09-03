import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { TABS_CONFIG } from "../../constants/tabs";
import { styles } from "./styles";
import { ITabBarItemProps } from "./types";
import { Colors } from "@/constants/colors";

function TabBarItem({ routeName, onPress, isFocused, hasBadge }: ITabBarItemProps) {
    const { activeIcon, inactiveIcon } = TABS_CONFIG[routeName];
    const iconName = isFocused ? activeIcon : inactiveIcon;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={isFocused ? styles.activeTabButton : styles.inactiveTabButton}
            testID={`tab-button-${routeName}`}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name={iconName}
                    size={isFocused ? 32 : 28}
                    color={isFocused ? Colors.textPrimary : Colors.textMuted}
                />
                {hasBadge ? (
                    <View
                        style={[styles.badge, isFocused && styles.activeBadge]}
                        testID={`tab-badge-${routeName}`}
                    />
                ) : null}
            </View>
        </TouchableOpacity>
    );
}

export default React.memo(TabBarItem);
