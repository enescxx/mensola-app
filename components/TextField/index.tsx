import { Text, TextInput } from "react-native";

import { styles } from "./styles";
import { ITextFieldProps, TextFieldType } from "./types";

const typePresets: Record<TextFieldType, Partial<ITextFieldProps>> = {
    text: {},
    email: { keyboardType: "email-address" },
    password: { secureTextEntry: true },
    number: { keyboardType: "number-pad" }
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
                autoCapitalize="none"
                autoCorrect={false}
                {...presetProps}
                {...rest}
            />
        </>
    );
}
