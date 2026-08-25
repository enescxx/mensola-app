import { Stack } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { Colors } from "@/constants/colors";

export default function PlaylistsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (props) => <PageHeader {...props} />,
                contentStyle: { backgroundColor: Colors.background },
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="[playlistId]" options={{ title: "Playlist" }} />
        </Stack>
    );
}
