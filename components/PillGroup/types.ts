import { Ionicons } from "@expo/vector-icons";
import { ViewStyle } from "react-native";

export type PillOption<T extends string | number> = {
    label: string;
    value: T;
    icon?: keyof typeof Ionicons.glyphMap;
};
export type SingleSelectProps<T extends string | number> = {
    multiSelect?: false;
    selectedValue: T;
    onSelect: (value: T) => void;
};
export type MultiSelectProps<T extends string | number> = {
    multiSelect: true;
    selectedValues: T[];
    onSelect: (value: T[]) => void;
};
export type PillGroupProps<T extends string | number> = (SingleSelectProps<T> | MultiSelectProps<T>) & {
    options: PillOption<T>[];
    containerStyle?: ViewStyle;
};
export type PillItemProps = {
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
    isSelected: boolean;
    onPress: () => void;
};
