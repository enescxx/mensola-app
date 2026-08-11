import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ProfileProvider } from "@/context/ProfileContext";

import PageHeader from "@/components/PageHeader";

export default function RootLayout() {
    const { userId } = useLocalSearchParams<{ userId: string }>();

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
                        animation: "slide_from_right",
                    }}
                />
            </Stack>
        </ProfileProvider>
    );
}
