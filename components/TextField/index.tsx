import { Text, TextInput } from "react-native";

import { styles } from "./styles";
import { ITextFieldProps, TextFieldType } from "./types";

const typePresets: Record<TextFieldType, Partial<ITextFieldProps>> = {
    text: {},
    email: {
        keyboardType: "email-address",
        autoCapitalize: "none",
        autoCorrect: false
    },
    password: {
        secureTextEntry: true,
        autoCapitalize: "none",
        autoCorrect: false
    }
};

export default function TextField({
    label,
    type = "text",
    ...rest
}: ITextFieldProps) {
    const presetProps = typePresets[type];

    return (
        <>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.textField}
                placeholderTextColor="#8c8c8c"
                {...presetProps}
                {...rest}
            />
        </>
    );
}
