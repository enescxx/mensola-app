import PageHeader from "@/components/PageHeader";
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (props) => <PageHeader {...props} />,
            }}>
            <Stack.Screen name="[movieId]/index" />
            <Stack.Screen name="[movieId]/interactions" />
        </Stack>
    );
}
