import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";
import { IHeaderStatItemProps } from "./types";
import { StatLabels } from "@/types/stat.types";

export default function ProfileStatItem({ statType, statValue, onPress }: IHeaderStatItemProps) {
    const statLabel = StatLabels[statType];

    return (
        <TouchableOpacity
            style={styles.statItem}
            onPress={() => onPress?.(statType)}
            activeOpacity={0.7}>
            <Text style={styles.statValue}>{statValue}</Text>
            <Text style={styles.statLabel}>{statLabel}</Text>
        </TouchableOpacity>
    );
}
