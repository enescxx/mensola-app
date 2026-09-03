import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SettingsItem from "./SettingsItem";
import { OptionsSetting } from "./types";

describe("SettingsItem Component", () => {
    const enabledItem: OptionsSetting = {
        id: "default-tab",
        type: "options",
        label: "Default Tab",
        value: "movies",
        options: [
            { label: "Movies", value: "movies" },
            { label: "Music", value: "tracks" },
        ],
    };

    const disabledItem: OptionsSetting = {
        id: "theme",
        type: "options",
        label: "Appearance (Coming Soon)",
        value: "dark",
        disabled: true,
        options: [
            { label: "Dark", value: "dark" },
            { label: "Light", value: "light" },
        ],
    };

    it("triggers onOptionPress when item is enabled", () => {
        const onOptionPress = jest.fn();
        const { getByTestId } = render(
            <SettingsItem item={enabledItem} onOptionPress={onOptionPress} />
        );

        fireEvent.press(getByTestId("settings-item-default-tab"));
        expect(onOptionPress).toHaveBeenCalledWith(enabledItem);
    });

    it("does NOT trigger onOptionPress when item has disabled: true", () => {
        const onOptionPress = jest.fn();
        const { getByTestId } = render(
            <SettingsItem item={disabledItem} onOptionPress={onOptionPress} />
        );

        fireEvent.press(getByTestId("settings-item-theme"));
        expect(onOptionPress).not.toHaveBeenCalled();
    });

    it("does NOT trigger onOptionPress when item label contains 'Coming Soon' even without explicit flag", () => {
        const onOptionPress = jest.fn();
        const comingSoonItem: OptionsSetting = {
            id: "shelf-layout",
            type: "options",
            label: "Shelf Layout (Coming Soon)",
            value: "grid",
            options: [{ label: "Grid", value: "grid" }],
        };
        const { getByTestId } = render(
            <SettingsItem item={comingSoonItem} onOptionPress={onOptionPress} />
        );

        fireEvent.press(getByTestId("settings-item-shelf-layout"));
        expect(onOptionPress).not.toHaveBeenCalled();
    });
});
