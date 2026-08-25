import { StyleProp, TextInputProps, TextStyle } from "react-native";

export type TextFieldType = "text" | "email" | "password" | "number";
export interface ITextFieldProps extends TextInputProps {
    label?: string;
    type?: TextFieldType;
    error?: string;
    style?: StyleProp<TextStyle>;
}
