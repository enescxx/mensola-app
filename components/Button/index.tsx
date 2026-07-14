import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";
import { IButtonProps } from "./types";

export default function Button({ label, onPress }: IButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
}
