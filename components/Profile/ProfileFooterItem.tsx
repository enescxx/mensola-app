import { TouchableOpacity, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { styles } from "./styles";
import { IFooterItemProps } from "./types";
import { StatLabels } from "@/types/stat.types";

export default function ProfileFooterItem({ statType, statValue, onPress }: IFooterItemProps) {
    return (
        <TouchableOpacity style={styles.footerItem} onPress={() => onPress?.(statType)}>
            <Text style={styles.footerItemLabel}>{StatLabels[statType]}</Text>
            <View style={styles.footerItemRightContainer}>
                <Text style={styles.footerItemValue}>{statValue}</Text>
                <Entypo name="chevron-right" size={24} color="#8c8c8c" />
            </View>
        </TouchableOpacity>
    );
}
