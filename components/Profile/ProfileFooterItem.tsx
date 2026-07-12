import { TouchableOpacity, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

import { styles } from "./styles";
import { FooterItemLabels, IFooterItemProps } from "./types";

export default function ProfileFooterItem({
    type,
    value,
    onPress
}: IFooterItemProps) {
    return (
        <TouchableOpacity style={styles.footerItem} onPress={onPress}>
            <Text style={styles.footerItemLabel}>{FooterItemLabels[type]}</Text>
            <View style={styles.footerItemRightContainer}>
                <Text style={styles.footerItemValue}>{value}</Text>
                <Entypo name="chevron-right" size={24} color="#8c8c8c" />
            </View>
        </TouchableOpacity>
    );
}
