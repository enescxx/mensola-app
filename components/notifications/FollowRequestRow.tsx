import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { FollowRequestRowProps } from "./types";
import { styles } from "./styles";

export default function FollowRequestRow({
    item,
    onAccept,
    onDecline,
    onPressActor,
    isLoading = false,
}: FollowRequestRowProps) {
    const { t } = useTranslation();
    const { actor, createdAt, status = "pending" } = item;

    const handleActorPress = () => {
        onPressActor?.(actor.id);
    };

    const handleAccept = () => {
        onAccept?.(item.id);
    };

    const handleDecline = () => {
        onDecline?.(item.id);
    };

    return (
        <View style={styles.row} testID={`follow-request-row-${item.id}`}>
            {/* Avatar with Request Badge */}
            <TouchableOpacity onPress={handleActorPress} activeOpacity={0.7} style={styles.avatarContainer}>
                {actor.avatar ? (
                    <Image source={{ uri: actor.avatar }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarFallback}>
                        <Text style={styles.avatarFallbackText}>
                            {actor.username.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                )}
                <View style={[styles.badgeIcon, styles.badgeRequest]}>
                    <Ionicons name="person-add" size={10} color="#FFFFFF" />
                </View>
            </TouchableOpacity>

            {/* Content info */}
            <TouchableOpacity
                onPress={handleActorPress}
                activeOpacity={0.7}
                style={styles.contentContainer}>
                <Text style={styles.actorName} numberOfLines={1}>
                    {actor.fullName || actor.username}
                </Text>
                <Text style={styles.messageText} numberOfLines={1}>
                    {t("notifications.wantsToFollow")}
                </Text>
                {createdAt ? <Text style={styles.timeText}>{createdAt}</Text> : null}
            </TouchableOpacity>

            {/* Actions / Status */}
            <View style={styles.actionsContainer}>
                {status === "accepted" ? (
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusBadgeText}>{t("notifications.accepted")}</Text>
                    </View>
                ) : status === "declined" ? (
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusBadgeText}>{t("notifications.declined")}</Text>
                    </View>
                ) : isLoading ? (
                    <ActivityIndicator size="small" color="#FF8000" />
                ) : (
                    <>
                        <TouchableOpacity
                            style={styles.acceptButton}
                            onPress={handleAccept}
                            activeOpacity={0.8}
                            testID={`accept-request-${item.id}`}>
                            <Text style={styles.acceptButtonText}>{t("notifications.accept")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.declineButton}
                            onPress={handleDecline}
                            activeOpacity={0.8}
                            testID={`decline-request-${item.id}`}>
                            <Text style={styles.declineButtonText}>{t("notifications.decline")}</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}
