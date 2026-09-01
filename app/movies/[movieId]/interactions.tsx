import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/colors";

export default function MovieInteractionsPage() {
    const { t } = useTranslation();
    const { movieId } = useLocalSearchParams<{ movieId?: string }>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{t("movies.interactions.title")}</Text>
                <Text style={styles.subtitle}>{t("movies.interactions.subtitle", { id: movieId })}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    title: {
        color: Colors.textPrimary,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8,
    },
    subtitle: {
        color: Colors.textMuted,
        fontSize: 14,
    },
});
