import { Ionicons } from "@expo/vector-icons";

interface IHeaderAction {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    color?: string;
    size?: number;
}

export { IHeaderAction };
