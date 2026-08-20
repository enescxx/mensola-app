import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { AddToPlaylistSheetItemProps } from "./types";

export default function AddToPlaylistSheetItem({ item, onToggle, isLoading = false }: AddToPlaylistSheetItemProps) {
    return (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => onToggle(item.id)}
            activeOpacity={0.7}
            disabled={isLoading}>
            <View style={styles.listItemLeft}>
                <Ionicons name="musical-notes-outline" style={styles.listItemIcon} />
                <Text style={styles.listItemTitle} numberOfLines={1}>
                    {item.title}
                </Text>
            </View>

            {isLoading ? (
                <ActivityIndicator size="small" color="#1DB954" />
            ) : (
                <View style={[styles.checkbox, item.isChecked && styles.checkboxChecked]}>
                    {item.isChecked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
            )}
        </TouchableOpacity>
    );
}
