import { Stack } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { Colors } from "@/constants/colors";

export default function TracksLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTransparent: true,
                header: (props) => <PageHeader {...props} />,
                contentStyle: { backgroundColor: Colors.background },
                animation: "slide_from_right",
            }}>
            <Stack.Screen name="[trackId]" options={{ title: "Şarkı" }} />
        </Stack>
    );
}
