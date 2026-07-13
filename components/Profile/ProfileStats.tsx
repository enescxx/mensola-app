import { View } from "react-native";

import { StatTypes } from "../../types";

import { styles } from "./styles";
import { IHeaderStatsProps } from "./types";
import StatView from "./ProfileStatItem";

export default function ProfileStats({ stats }: IHeaderStatsProps) {
    const onStatPress = (type: StatTypes) => {};

    return (
        <View style={styles.statsContainer}>
            {stats?.map(stat => (
                <StatView
                    key={stat.type}
                    statData={stat}
                    onPress={onStatPress}
                />
            ))}
        </View>
    );
}
