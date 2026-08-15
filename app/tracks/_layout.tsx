import { Stack } from "expo-router";
import PageHeader from "@/components/PageHeader";

export default function TracksLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (props) => <PageHeader {...props} />,
                contentStyle: { backgroundColor: "#121212" },
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="[trackId]" options={{ title: "Şarkı" }} />
        </Stack>
    );
}
