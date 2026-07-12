import { View } from "react-native";

import { styles } from "./styles";
import FooterItem from "./ProfileFooterItem";

const FOOTER_ITEMS = [
    { type: "songLikes", value: 23 },
    { type: "artistLikes", value: 37 },
    { type: "movieLikes", value: 14 },
    { type: "watchlist", value: 17 },
    { type: "musicPlaylists", value: 21 },
    { type: "movieLists", value: 27 }
];

export default function ProfileFooter() {
    const footerItemPress = type => {};

    return (
        <View style={styles.profileFooter}>
            {FOOTER_ITEMS.map((item, index) => (
                <FooterItem
                    key={index}
                    type={item.type}
                    value={item.value}
                    onPress={() => footerItemPress(item.type)}
                />
            ))}
        </View>
    );
}
