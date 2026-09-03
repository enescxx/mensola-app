import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { Colors } from "@/constants/colors";
import { NotificationEmptyStateProps } from "./types";
import { styles } from "./styles";

export default function NotificationEmptyState({ title, message }: NotificationEmptyStateProps) {
    const { t } = useTranslation();

    const displayTitle = title || t("notifications.emptyTitle");
    const displayMessage = message || t("notifications.emptySubtitle");

    return (
        <View style={styles.emptyContainer} testID="notification-empty-state">
            <View style={styles.emptyIconWrapper}>
                <Ionicons name="notifications-outline" size={38} color={Colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>{displayTitle}</Text>
            <Text style={styles.emptySubtitle}>{displayMessage}</Text>
        </View>
    );
}
