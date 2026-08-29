import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import ChangeEmail from "@/components/Settings/ChangeEmail";
import { Colors } from "@/constants/colors";
import { useGlobalUser } from "@/context/AuthContext";

export default function UpdateEmailPage() {
    const { user } = useGlobalUser();

    return (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            <ChangeEmail currentEmail={user?.email ?? ""} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});
