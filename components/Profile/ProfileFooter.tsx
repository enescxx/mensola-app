import { View } from "react-native";

import { styles } from "./styles";
import FooterItem from "./ProfileFooterItem";

import { useProfileContext } from "../../context/ProfileContext";
import { StatTypeKey } from "@/types/stat.types";

export default function ProfileFooter() {
    const { footerData, handleStatPress } = useProfileContext();
    const { stats } = footerData;

    return (
        <View style={styles.profileFooter}>
            {Object.entries(stats).map(([key, value]) => (
                <FooterItem key={key} statType={key as StatTypeKey} statValue={value} onPress={handleStatPress} />
            ))}
        </View>
    );
}
