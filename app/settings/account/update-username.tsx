import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import ChangeUsername from "@/components/Settings/ChangeUsername";
import { Colors } from "@/constants/colors";
import { useGlobalUser } from "@/context/AuthContext";

export default function UpdateUsernamePage() {
    const { user } = useGlobalUser();

    return (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            <ChangeUsername
                currentUsername={user?.username ?? ""}
                currentFullname={user?.fullname}
                currentAvatar={user?.avatar?.toString()}
                userId={user?.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});
