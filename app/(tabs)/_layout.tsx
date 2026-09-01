import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

import TabBar from "../../components/TabBar";

export default function TabsLayout() {
    const { t } = useTranslation();

    return (
        <Tabs screenOptions={{ headerShown: false }} tabBar={(props: any) => <TabBar {...props} />}>
            <Tabs.Screen name="home" options={{ title: t("tabs.home") }} />
            <Tabs.Screen name="search" options={{ title: t("tabs.search") }} />
            <Tabs.Screen name="notifications" options={{ title: t("tabs.notifications") }} />
            <Tabs.Screen name="me" options={{ title: t("tabs.profile") }} />
        </Tabs>
    );
}
