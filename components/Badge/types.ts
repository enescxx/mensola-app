import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

interface IBadgeProps {
    icon: ReactNode;
    value?: number;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export { IBadgeProps };
