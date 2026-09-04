import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/colors";
import { SearchNoResultsProps } from "./types";

export default function SearchNoResults({ onRefresh, refreshing = false }: SearchNoResultsProps) {
    const { t } = useTranslation();

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            refreshControl={
                onRefresh ? (
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={Colors.primary}
                        colors={[Colors.primary]}
                    />
                ) : undefined
            }
        >
            <View style={styles.iconOuterRing}>
                <View style={styles.iconInnerContainer}>
                    <Ionicons name="search-outline" size={38} color={Colors.textMuted} />
                </View>
            </View>
            <Text style={styles.title} accessibilityRole="header">
                {t("search.emptyState.noResultsTitle")}
            </Text>
            <Text style={styles.description}>
                {t("search.emptyState.noResultsDescription")}
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
        paddingBottom: 80,
    },
    iconOuterRing: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: "rgba(74, 158, 255, 0.04)",
        borderWidth: 1,
        borderColor: "rgba(74, 158, 255, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    iconInnerContainer: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.textPrimary,
        textAlign: "center",
        marginBottom: 8,
        letterSpacing: -0.2,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: Colors.textSecondary,
        textAlign: "center",
        maxWidth: 290,
    },
});
