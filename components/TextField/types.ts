import { TextInputProps } from "react-native";

type TextFieldType = "text" | "email" | "password" | "number";

interface ITextFieldProps extends TextInputProps {
    label?: string;
    type?: TextFieldType;
}

export { ITextFieldProps, TextFieldType };
