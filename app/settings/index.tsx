import SettingsView from "@/components/Settings";
import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsPage() {
    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <SettingsView />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 24,
    },
});
