import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { IActionBtnProps } from "./types";

export default function ActionButton({ icon, isActive, activeColor }: IActionBtnProps) {
    return (
        <TouchableOpacity style={[styles.actionBtn, isActive && { backgroundColor: activeColor }]} activeOpacity={0.7}>
            <Ionicons name={icon} style={styles.actionBtnIcon} />
        </TouchableOpacity>
    )
}