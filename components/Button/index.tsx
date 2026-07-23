import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";
import { IButtonProps } from "./types";

export default function Button({
    label,
    onPress,
    style,
    labelStyle,
    ...restProps
}: IButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
            {...restProps}
        >
            <Text style={[styles.label, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    );
}
