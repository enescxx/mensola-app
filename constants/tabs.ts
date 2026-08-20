import { Ionicons } from "@expo/vector-icons";

type IconName = keyof typeof Ionicons.glyphMap;
interface TabConfigItem {
    activeIcon: IconName;
    inactiveIcon: IconName;
}

const TABS_CONFIG: Record<string, TabConfigItem> = {
    home: {
        activeIcon: "home",
        inactiveIcon: "home-outline",
    },
    search: {
        activeIcon: "search",
        inactiveIcon: "search-outline",
    },
    notifications: {
        activeIcon: "notifications",
        inactiveIcon: "notifications-outline",
    },
    me: {
        activeIcon: "person",
        inactiveIcon: "person-outline",
    },
};

export { TABS_CONFIG };
