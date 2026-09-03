import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { IActionBtnProps } from "./types";
import { Colors } from "@/constants/colors";

export default function ActionButton({
    icon,
    iconComponent,
    isActive,
    activeColor,
    onPress,
    disabled,
    isLoading,
    style,
    testID,
}: IActionBtnProps) {
    return (
        <TouchableOpacity
            style={[
                styles.actionBtn,
                isActive && { backgroundColor: activeColor },
                disabled && { opacity: 0.4 },
                style,
            ]}
            activeOpacity={0.7}
            onPress={onPress}
            disabled={disabled || isLoading}
            testID={testID}>
            {isLoading ? (
                <ActivityIndicator size="small" color={Colors.textPrimary} />
            ) : iconComponent ? (
                iconComponent
            ) : icon ? (
                <Ionicons name={icon} style={styles.actionBtnIcon} />
            ) : null}
        </TouchableOpacity>
    );
}
