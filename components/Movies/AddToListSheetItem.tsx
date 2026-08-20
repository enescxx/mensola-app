import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { IAddToListSheetItemProps } from "./types";
import { MovieListId } from "@/types/common.types";

export default function AddToListSheetItem({
    item,
    onToggle,
    isLoading = false,
    onStatusChange,
}: IAddToListSheetItemProps) {
    const handlePress = () => {
        onToggle(item.id as MovieListId, item.isWatchlist, onStatusChange);
    };

    return (
        <TouchableOpacity style={styles.listItem} onPress={handlePress} activeOpacity={0.7} disabled={isLoading}>
            <View style={styles.listItemLeft}>
                <Ionicons name={item.isWatchlist ? "bookmark" : "list"} style={styles.listItemIcon} />
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
