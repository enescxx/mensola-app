import { View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TABS_CONFIG } from "../../constants/tabs";
import TabBarItem from "./TabBarItem";
import { styles } from "./styles";

export default function TabBar({ state, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    const dynamicBottomSpace = insets.bottom > 0 ? insets.bottom + 12 : 24;

    return (
        <View style={[styles.tabBarContainer, { bottom: dynamicBottomSpace }]}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TabBarItem
                        key={route.key}
                        routeName={route.name as keyof typeof TABS_CONFIG}
                        onPress={onPress}
                        isFocused={isFocused}
                    />
                );
            })}
        </View>
    );
}
