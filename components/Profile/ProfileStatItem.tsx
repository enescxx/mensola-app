import { TouchableOpacity, Text } from "react-native";
import { useTranslation } from "react-i18next";

import { styles } from "./styles";
import { IHeaderStatItemProps } from "./types";
import { getStatLabels } from "@/types/stat.types";

export default function ProfileStatItem({ statType, statValue, onPress }: IHeaderStatItemProps) {
    const { t } = useTranslation();
    const statLabel = getStatLabels(t)[statType];

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
