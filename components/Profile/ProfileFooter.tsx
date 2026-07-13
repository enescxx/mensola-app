import { View } from "react-native";

import { styles } from "./styles";
import { IProfileFooterProps } from "./types";
import FooterItem from "./ProfileFooterItem";

export default function ProfileFooter({ stats }: IProfileFooterProps) {
    const footerItemPress = type => {};

    return (
        <View style={styles.profileFooter}>
            {stats?.map(item => (
                <FooterItem
                    key={item.type}
                    statData={item}
                    onPress={() => footerItemPress(item.type)}
                />
            ))}
        </View>
    );
}
