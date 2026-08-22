import { Text, TouchableOpacity, View } from "react-native";
import { PillItemProps } from "./types";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function PillItem({ label, icon, isSelected, onPress }: PillItemProps) {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.pill, isSelected && styles.activePill]}>
            {icon && <Ionicons name={icon} style={[styles.icon, isSelected && styles.activeIcon]} />}
            <Text style={[styles.text, isSelected && styles.activeText]}>{label}</Text>
        </TouchableOpacity>
    );
}
