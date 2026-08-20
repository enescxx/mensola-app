import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ProfileProvider } from "@/context/ProfileContext";

import PageHeader from "@/components/PageHeader";
import { UserId } from "@/types/common.types";

export default function RootLayout() {
    const { userId } = useLocalSearchParams<{ userId: UserId }>();

    return (
        <ProfileProvider userId={userId}>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen
                    name="[statType]"
                    options={{
                        headerShown: true,
                        header: (props) => <PageHeader {...props} />,
                        animation: "fade_from_bottom",
                    }}
                />
            </Stack>
        </ProfileProvider>
    );
}
