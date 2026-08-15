import { Stack } from "expo-router";
import PageHeader from "@/components/PageHeader";

export default function AlbumsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (props) => <PageHeader {...props} />,
                contentStyle: { backgroundColor: "#121212" },
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="[albumId]" options={{ title: "Albüm" }} />
        </Stack>
    );
}
