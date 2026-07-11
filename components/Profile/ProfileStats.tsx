import { View } from "react-native";

import { styles } from "./styles";
import { IProfileStatsProps, StatTypes } from "./types";
import StatView from "./ProfileStatItem";

export default function ProfileStats({ statsData }: IProfileStatsProps) {
    const onStatPress = (type: StatTypes) => {};

    return (
        <View style={styles.statsContainer}>
            {statsData.map((stat, index) => (
                <StatView key={index} data={stat} onPress={onStatPress} />
            ))}
        </View>
    );
}
