import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";
import { IProfileStatItemProps } from "./types";

export default function ProfileStatItem({
    data,
    onPress
}: IProfileStatItemProps) {
    return (
        <TouchableOpacity
            style={styles.statItem}
            onPress={() => onPress(data.type)}
            activeOpacity={0.7}
        >
            <Text style={styles.statValue}>{data.value}</Text>
            <Text style={styles.statLabel}>{data.label}</Text>
        </TouchableOpacity>
    );
}
