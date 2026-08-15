import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IPlaylistItemOption } from "@/hooks/music/useUserPlaylists";

interface AddToPlaylistSheetItemProps {
    item: IPlaylistItemOption;
    onToggle: (playlistId: string) => void;
    isLoading?: boolean;
}

export default function AddToPlaylistSheetItem({
    item,
    onToggle,
    isLoading = false,
}: AddToPlaylistSheetItemProps) {
    return (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => onToggle(item.id)}
            activeOpacity={0.7}
            disabled={isLoading}
        >
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

const styles = StyleSheet.create({
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#2A2A2A",
    },
    listItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    listItemIcon: {
        color: "#A7A7A7",
        fontSize: 20,
    },
    listItemTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "500",
        flex: 1,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#555555",
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxChecked: {
        backgroundColor: "#1DB954",
        borderColor: "#1DB954",
    },
});
