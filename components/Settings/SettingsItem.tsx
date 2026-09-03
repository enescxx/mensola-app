import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { ListGroupItem } from "../ListGroup";
import Toggle from "../Toggle";
import { Colors } from "@/constants/colors";
import { SettingsItemProps } from "./types";
import { styles } from "./styles";

export default function SettingsItem({
    item,
    isFirst,
    isLast,
    onToggle,
    onOptionPress,
    onActionPress,
}: SettingsItemProps) {
    const router = useRouter();

    const isDisabled =
        !!item.disabled ||
        item.label.toLowerCase().includes("coming soon") ||
        item.label.toLowerCase().includes("yakında");

    const handlePress = () => {
        if (isDisabled) return;

        if (item.type === "route") {
            router.push(item.route as any);
        } else if (item.type === "options") {
            onOptionPress?.(item);
        } else if (item.type === "action") {
            onActionPress?.(item.actionKey);
        } else if (item.type === "toggle") {
            onToggle?.(item.id, !item.value);
        }
    };

    const renderRightContent = () => {
        switch (item.type) {
            case "route":
                return (
                    <>
                        {item.value ? (
                            <Text style={styles.valueText} numberOfLines={1}>
                                {item.value}
                            </Text>
                        ) : null}
                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color={isDisabled ? Colors.border : Colors.textMuted}
                        />
                    </>
                );
            case "options":
                const selectedOption = item.options.find((opt) => opt.value === item.value);
                const displayLabel = selectedOption ? selectedOption.label : item.value;
                return (
                    <>
                        <Text style={styles.valueText} numberOfLines={1}>
                            {displayLabel}
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color={isDisabled ? Colors.border : Colors.textMuted}
                        />
                    </>
                );
            case "toggle":
                return (
                    <Toggle
                        value={item.value}
                        onValueChange={(newValue) => onToggle?.(item.id, newValue)}
                        disabled={isDisabled}
                    />
                );
            case "action":
                return null;
            default:
                return null;
        }
    };

    const isDangerAction = item.type === "action" && item.variant === "danger";

    return (
        <ListGroupItem
            isFirst={isFirst}
            isLast={isLast}
            onPress={isDisabled ? undefined : handlePress}
            disabled={isDisabled}
            style={isDisabled ? styles.disabledItem : undefined}
            testID={`settings-item-${item.id}`}>
            <View style={styles.leftContainer}>
                {item.icon ? (
                    <Ionicons
                        name={item.icon as any}
                        size={20}
                        color={isDangerAction ? Colors.danger : Colors.textSecondary}
                        style={styles.icon}
                    />
                ) : null}
                <View style={styles.textContainer}>
                    <Text style={isDangerAction ? styles.dangerLabel : styles.label} numberOfLines={1}>
                        {item.label}
                    </Text>
                    {item.description ? (
                        <Text style={styles.description}>
                            {item.description}
                        </Text>
                    ) : null}
                </View>
            </View>

            <View style={styles.rightContainer}>{renderRightContent()}</View>
        </ListGroupItem>
    );
}
