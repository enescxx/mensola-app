import { Stack } from "expo-router";
import PageHeader from "@/components/PageHeader";

export default function SettingsLayout() {
    return (
        <Stack
            screenOptions={{
                header: (props) => <PageHeader {...props} />,
            }}>
            <Stack.Screen name="index" options={{ title: "Settings" }} />
            <Stack.Screen name="account/update-username" options={{ title: "Change Username" }} />
            <Stack.Screen name="account/update-email" options={{ title: "Update Email" }} />
            <Stack.Screen name="account/update-password" options={{ title: "Change Password" }} />
        </Stack>
    );
}
