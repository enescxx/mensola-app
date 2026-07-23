import {
    StyleProp,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps
} from "react-native";

interface IButtonProps extends Partial<TouchableOpacityProps> {
    label: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
}

export { IButtonProps };
