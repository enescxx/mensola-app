import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import ChangePassword from "@/components/Settings/ChangePassword";
import { Colors } from "@/constants/colors";

export default function UpdatePasswordPage() {
    return (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            <ChangePassword />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});
