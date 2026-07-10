import { TABS_CONFIG } from "../../constants/tabs";

interface ITabBarItemProps {
    routeName: keyof typeof TABS_CONFIG;
    onPress: () => void;
    isFocused: boolean;
}

export { ITabBarItemProps };
