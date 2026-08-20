import { View } from "react-native";

import { styles } from "./styles";
import { IHeaderStatsProps } from "./types";
import StatView from "./ProfileStatItem";
import { StatType, StatTypeKey } from "@/types/stat.types";

export default function ProfileStats({ stats, onStatPress }: IHeaderStatsProps) {
    return (
        <View style={styles.statsContainer}>
            {Object.entries(stats).map(([key, value]) => (
                <StatView key={key} statType={key as StatTypeKey} statValue={value} onPress={onStatPress} />
            ))}
        </View>
    );
}
