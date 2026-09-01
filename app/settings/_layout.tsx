import { Stack } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { useTranslation } from "react-i18next";

export default function SettingsLayout() {
    const { t } = useTranslation();
    return (
        <Stack
            screenOptions={{
                header: (props) => <PageHeader {...props} />,
            }}>
            <Stack.Screen name="index" options={{ title: t("settings.layout.title") }} />
            <Stack.Screen name="account/update-username" options={{ title: t("settings.layout.updateUsername") }} />
            <Stack.Screen name="account/update-email" options={{ title: t("settings.layout.updateEmail") }} />
            <Stack.Screen name="account/update-password" options={{ title: t("settings.layout.updatePassword") }} />
        </Stack>
    );
}
