import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ProfileProvider } from "../../../context/ProfileContext";

export default function RootLayout() {
    return (
        <ProfileProvider userId="me">
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
            </Stack>
        </ProfileProvider>
    );
}
