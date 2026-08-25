import { View, Text, TouchableOpacity, TouchableOpacityProps, ViewProps } from "react-native";
import { styles } from "./styles";

interface ListGroupProps extends ViewProps {
    title?: string;
}

export function ListGroup({ title, children, style, ...rest }: ListGroupProps) {
    return (
        <View style={[styles.groupContainer, style]} {...rest}>
            {title ? <Text style={styles.sectionLabel}>{title}</Text> : null}
            <View style={styles.groupWrapper}>
                {children}
            </View>
        </View>
    );
}

interface ListGroupItemProps extends TouchableOpacityProps {
    isFirst?: boolean;
    isLast?: boolean;
}

export function ListGroupItem({ isFirst, isLast, style, children, ...rest }: ListGroupItemProps) {
    // If no onPress is provided, we might still want it to look like a list item but not be clickable.
    const isClickable = !!rest.onPress;
    
    return (
        <TouchableOpacity
            activeOpacity={isClickable ? 0.6 : 1}
            style={[
                styles.row,
                isFirst && styles.rowFirst,
                isLast && styles.rowLast,
                !isLast && styles.rowDivider,
                style,
            ]}
            {...rest}
        >
            {children}
        </TouchableOpacity>
    );
}
