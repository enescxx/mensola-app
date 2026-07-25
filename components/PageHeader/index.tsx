import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { styles } from "./styles";
import { IHeaderAction } from "./types";

export default function PageHeader({
    options,
    navigation,
    back
}: NativeStackHeaderProps) {
    const insets = useSafeAreaInsets();

    const title =
        options.title ||
        (typeof options.headerTitle === "string" ? options.headerTitle : "");

    const actions = (options as any).headerRightActions as
        | IHeaderAction[]
        | undefined;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                <View style={styles.buttonContainer}>
                    {back && (
                        <View style={styles.headerButton}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={styles.backButton}
                                activeOpacity={0.7}
                            >
                                <Ionicons
                                    name="chevron-back"
                                    size={24}
                                    color="#8c8c8c"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText} numberOfLines={1}>
                        {title}
                    </Text>
                </View>
                {actions && actions.length > 0 ? (
                    <View style={styles.buttonContainer}>
                        {actions.map(action => (
                            <View key={action.id} style={styles.headerButton}>
                                <TouchableOpacity
                                    onPress={action.onPress}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons
                                        name={action.icon}
                                        size={action.size || 24}
                                        color={action.color || "#8c8c8c"}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ) : null}
            </View>
        </View>
    );
}
