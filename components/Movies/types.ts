import { Ionicons } from "@expo/vector-icons";

interface IActionBtnProps {
    icon: keyof typeof Ionicons.glyphMap;
    isActive: boolean;
    activeColor: string;
}

export { IActionBtnProps };
