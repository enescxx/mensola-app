import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import NotificationsView from "@/components/notifications/NotificationsView";
import { NotificationItem } from "@/components/notifications/types";
import { styles } from "@/components/notifications/styles";

export default function NotificationsScreen() {
    const { t } = useTranslation();
    const router = useRouter();

    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        // Simulated network refresh; ready to hook into API endpoint
        setTimeout(() => {
            setRefreshing(false);
        }, 600);
    }, []);

    const handleAcceptRequest = useCallback((id: string) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: "accepted" as const } : item
            )
        );
    }, []);

    const handleDeclineRequest = useCallback((id: string) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: "declined" as const } : item
            )
        );
    }, []);

    const handlePressNotification = useCallback((item: NotificationItem) => {
        if (item.target) {
            if (item.target.type === "movie") {
                router.push(`/movies/${item.target.id}` as any);
            } else if (item.target.type === "track") {
                router.push(`/tracks/${item.target.id}` as any);
            } else if (item.target.type === "user") {
                router.push(`/user/${item.target.id}` as any);
            }
        } else if (item.actor?.id) {
            router.push(`/user/${item.actor.id}` as any);
        }
    }, [router]);

    const handlePressActor = useCallback((actorId: string) => {
        router.push(`/user/${actorId}` as any);
    }, [router]);

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t("notifications.title")}</Text>
            </View>

            <NotificationsView
                notifications={notifications}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                onAcceptRequest={handleAcceptRequest}
                onDeclineRequest={handleDeclineRequest}
                onPressNotification={handlePressNotification}
                onPressActor={handlePressActor}
            />
        </SafeAreaView>
    );
}
