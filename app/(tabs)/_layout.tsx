import { Tabs } from "expo-router";

import TabBar from "../../components/TabBar";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }} tabBar={(props: any) => <TabBar {...props} />}>
            <Tabs.Screen name="home" options={{ title: "Ana Sayfa" }} />
            <Tabs.Screen name="search" options={{ title: "Arama" }} />
            <Tabs.Screen name="notifications" options={{ title: "Bildirimler" }} />
            <Tabs.Screen name="me" options={{ title: "Profil" }} />
        </Tabs>
    );
}
