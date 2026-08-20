import { ReactNode } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";

export interface IBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    showCloseButton?: boolean;
    height?: number;
    containerStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    testID?: string;
}
