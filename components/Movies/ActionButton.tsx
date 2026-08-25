import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { IActionBtnProps } from "./types";
import { Colors } from "@/constants/colors";

export default function ActionButton({ icon, isActive, activeColor, onPress, disabled, isLoading }: IActionBtnProps) {
    return (
        <TouchableOpacity
            style={[styles.actionBtn, isActive && { backgroundColor: activeColor }]}
            activeOpacity={0.7}
            onPress={onPress}
            disabled={disabled || isLoading}>
            {isLoading ? (
                <ActivityIndicator size="small" color={Colors.textPrimary} />
            ) : (
                <Ionicons name={icon} style={styles.actionBtnIcon} />
            )}
        </TouchableOpacity>
    );
}
