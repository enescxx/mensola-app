import { TextInputProps } from "react-native";

type TextFieldType = "text" | "email" | "password";

interface ITextFieldProps extends TextInputProps {
    label?: string;
    type?: TextFieldType;
}

export { ITextFieldProps, TextFieldType };
