import PageHeader from "@/components/PageHeader";
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="[movieId]/index"
                options={{
                    headerShown: true,
                    header: (props) => <PageHeader {...props} />,
                }}
            />
            <Stack.Screen name="[movieId]/interactions" />
        </Stack>
    );
}
