export interface BaseSetting {
    id: string;
    label: string;
    description?: string;
    icon?: string;
}

export interface RouteSetting extends BaseSetting {
    type: "route";
    route: string;
    value?: string;
}

export interface OptionsSetting extends BaseSetting {
    type: "options";
    value: string;
    options: { label: string; value: string }[];
}

export interface ToggleSetting extends BaseSetting {
    type: "toggle";
    value: boolean;
}

export interface ActionSetting extends BaseSetting {
    type: "action";
    actionKey: string;
    variant?: "default" | "danger";
}

export type SettingItem = RouteSetting | OptionsSetting | ToggleSetting | ActionSetting;

export interface SettingSection {
    id: string;
    title: string;
    items: SettingItem[];
}

export interface SettingsItemProps {
    item: SettingItem;
    isFirst?: boolean;
    isLast?: boolean;
    onToggle?: (id: string, value: boolean) => void;
    onOptionPress?: (item: OptionsSetting) => void;
    onActionPress?: (actionKey: string) => void;
}

