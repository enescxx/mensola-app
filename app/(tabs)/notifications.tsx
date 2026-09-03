import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import NotificationsView from "@/components/notifications/NotificationsView";
import { NotificationItem } from "@/components/notifications/types";
import { styles } from "@/components/notifications/styles";
import { useNotifications } from "@/hooks/notifications/useNotifications";

export default function NotificationsScreen() {
    const { t } = useTranslation();
    const router = useRouter();

    const {
        notifications,
        isRefetching,
        refetch,
        acceptRequest,
        declineRequest,
    } = useNotifications();

    const handleRefresh = useCallback(async () => {
        await refetch();
    }, [refetch]);

    const handleAcceptRequest = useCallback(async (id: string) => {
        await acceptRequest(id);
    }, [acceptRequest]);

    const handleDeclineRequest = useCallback(async (id: string) => {
        await declineRequest(id);
    }, [declineRequest]);

    const handlePressNotification = useCallback((item: NotificationItem) => {
        if (item.target) {
            if (item.target.type === "movie") {
                router.push(`/movies/${item.target.id}` as any);
            } else if (item.target.type === "track") {
                router.push(`/tracks/${item.target.id}` as any);
            } else if (item.target.type === "user") {
                router.push(`/users/${item.target.id}` as any);
            }
        } else if (item.actor?.id) {
            router.push(`/users/${item.actor.id}` as any);
        }
    }, [router]);

    const handlePressActor = useCallback((actorId: string) => {
        router.push(`/users/${actorId}` as any);
    }, [router]);

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t("notifications.title")}</Text>
            </View>

            <NotificationsView
                notifications={notifications}
                refreshing={isRefetching}
                onRefresh={handleRefresh}
                onAcceptRequest={handleAcceptRequest}
                onDeclineRequest={handleDeclineRequest}
                onPressNotification={handlePressNotification}
                onPressActor={handlePressActor}
            />
        </SafeAreaView>
    );
}
