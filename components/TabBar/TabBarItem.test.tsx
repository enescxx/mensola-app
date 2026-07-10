import React from "react";
import { StyleSheet } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import TabBarItem from "./TabBarItem";

jest.mock("../../constants/tabs", () => ({
    TABS_CONFIG: {
        Home: { activeIcon: "home", inactiveIcon: "home-outline" },
        Profile: { activeIcon: "person", inactiveIcon: "person-outline" }
    }
}));

describe("TabBarItem Bileşeni", () => {
    const mockOnPress = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("aktif (focused) durumdayken doğru ikon ve stillerle render edilmeli", () => {
        const { getByTestId, getByText } = render(
            <TabBarItem
                routeName="Home"
                onPress={mockOnPress}
                isFocused={true}
            />
        );
        const tabButton = getByTestId("tab-button-Home");

        expect(tabButton).toBeTruthy();
        fireEvent.press(tabButton);
        expect(mockOnPress).toHaveBeenCalledTimes(1);

        expect(getByText("home")).toBeTruthy();

        const flattenedStyle = StyleSheet.flatten(tabButton.props.style);
        expect(flattenedStyle).toEqual(
            expect.objectContaining({
                backgroundColor: "#1DB954"
            })
        );
    });

    it("pasif durumdayken doğru şekilde render edilmeli", () => {
        const { getByTestId, getByText } = render(
            <TabBarItem
                routeName="Home"
                onPress={mockOnPress}
                isFocused={false}
            />
        );

        const tabButton = getByTestId("tab-button-Home");
        expect(tabButton).toBeTruthy();

        expect(getByText("home-outline")).toBeTruthy();
    });
});
