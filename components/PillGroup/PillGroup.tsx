import { View } from "react-native";
import PillItem from "./PillItem";
import { PillGroupProps } from "./types";
import { styles } from "./styles";

export default function PillGroup<T extends string | number>(props: PillGroupProps<T>) {
    const { options, containerStyle, multiSelect } = props;
    const handlePress = (optionValue: T) => {
        if (multiSelect) {
            const currentValues = props.selectedValues;
            const exists = currentValues.includes(optionValue);

            const nextValues = exists
                ? currentValues.filter((v) => v !== optionValue)
                : [...currentValues, optionValue];

            props.onSelect(nextValues);
        } else {
            props.onSelect(optionValue);
        }
    };

    const isOptionSelected = (optionValue: T) => {
        if (multiSelect) {
            return props.selectedValues.includes(optionValue);
        }
        return props.selectedValue === optionValue;
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {options.map((option) => {
                const isSelected = isOptionSelected(option.value);

                return (
                    <PillItem
                        key={option.value.toString()}
                        label={option.label}
                        icon={option.icon}
                        isSelected={isSelected}
                        onPress={() => handlePress(option.value)}
                    />
                );
            })}
        </View>
    );
}
