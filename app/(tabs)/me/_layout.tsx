import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ProfileProvider } from "../../../context/ProfileContext";

import { Text } from "react-native";

import PageHeader from "../../../components/PageHeader";

export default function RootLayout() {
    return (
        <ProfileProvider userId="me">
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen
                    name="[statType]"
                    options={{
                        headerShown: true,
                        header: props => <PageHeader {...props} />,
                        animation: "slide_from_right"
                    }}
                />
            </Stack>
        </ProfileProvider>
    );
}
