import { TouchableOpacity, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { styles } from "./styles";
import { StatLabels, IFooterItemProps } from "./types";

export default function ProfileFooterItem({
    statData,
    onPress
}: IFooterItemProps) {
    return (
        <TouchableOpacity
            style={styles.footerItem}
            onPress={() => onPress(statData.type)}
        >
            <Text style={styles.footerItemLabel}>
                {StatLabels[statData.type]}
            </Text>
            <View style={styles.footerItemRightContainer}>
                <Text style={styles.footerItemValue}>
                    {typeof statData.value === "object"
                        ? JSON.stringify(statData.value)
                        : statData.value}
                </Text>
                <Entypo name="chevron-right" size={24} color="#8c8c8c" />
            </View>
        </TouchableOpacity>
    );
}
