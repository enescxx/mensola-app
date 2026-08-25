import { Stack } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { Colors } from "@/constants/colors";

export default function MovieListsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (props) => <PageHeader {...props} />,
                contentStyle: { backgroundColor: Colors.background },
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="[listId]" options={{ title: "Film Listesi" }} />
        </Stack>
    );
}

