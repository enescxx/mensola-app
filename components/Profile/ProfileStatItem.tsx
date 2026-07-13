import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";
import { IHeaderStatItemProps, StatLabels } from "./types";

export default function ProfileStatItem({
    statData,
    onPress
}: IHeaderStatItemProps) {
    const statLabel = StatLabels[statData.type];

    return (
        <TouchableOpacity
            style={styles.statItem}
            onPress={() => onPress(statData.type)}
            activeOpacity={0.7}
        >
            <Text style={styles.statValue}>{statData.value}</Text>
            <Text style={styles.statLabel}>{statLabel}</Text>
        </TouchableOpacity>
    );
}
