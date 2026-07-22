import { View } from "react-native";

import { styles } from "./styles";
import FooterItem from "./ProfileFooterItem";

import { useProfileContext } from "../../context/ProfileContext";

export default function ProfileFooter() {
    const { footerData, handleStatPress } = useProfileContext();
    const { stats } = footerData;

    const footerItemPress = type => {};

    return (
        <View style={styles.profileFooter}>
            {stats?.map(item => (
                <FooterItem
                    key={item.type}
                    statData={item}
                    onPress={handleStatPress}
                />
            ))}
        </View>
    );
}
