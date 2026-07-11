import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContent}>
                <View style={styles.headerTopRow}>
                    <View style={styles.imageWrapper}>
                        <Image style={styles.profilePicture} />
                    </View>
                    <View style={styles.rightInfoContainer}>
                        <View style={styles.nameWrapper}>
                            <Text style={styles.fullnameLabel}>Enes Can</Text>
                            <Text style={styles.usernameLabel}>@enescxx</Text>
                        </View>
                        <View style={styles.statsContainer}>
                            <TouchableOpacity
                                style={styles.statItem}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.statValue}>147</Text>
                                <Text style={styles.statLabel}>Film</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.statItem}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.statValue}>47</Text>
                                <Text style={styles.statLabel}>Takipçi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.statItem}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.statValue}>38</Text>
                                <Text style={styles.statLabel}>Takip</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Text style={styles.userBio}>mensola user</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        paddingTop: 20
    },
    headerContent: { paddingHorizontal: 20, gap: 12 },
    headerTopRow: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    imageWrapper: {
        backgroundColor: "#1e1e1e",
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: "#333333"
    },
    profilePicture: { width: "100%", height: "100%", resizeMode: "cover" },
    rightInfoContainer: { flex: 1, gap: 8 },
    nameWrapper: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    },
    fullnameLabel: { fontSize: 20, color: "#fff", fontWeight: "bold" },
    usernameLabel: { fontSize: 16, color: "#8c8c8c" },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8
    },
    statItem: {
        backgroundColor: "#1e1e1e",
        borderRadius: 16,
        aspectRatio: 1,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#333333"
    },
    statValue: { fontSize: 16, color: "#fff" },
    statLabel: { fontSize: 12, color: "#8c8c8c" },
    userBio: { color: "#8c8c8c" }
});
