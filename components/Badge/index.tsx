import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { IBadgeProps } from "./types";

export default function Badge({ icon, value, onPress, style, textStyle }: IBadgeProps) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.7 : 1} style={[styles.badge, style]}>
            {icon}
            {value !== undefined && value !== null ? (
                <Text style={[styles.badgeText, textStyle]}>{value}</Text>
            ) : null}
        </TouchableOpacity>
    );
}
