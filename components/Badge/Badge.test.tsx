import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import Badge from "./index";

describe("Badge Component", () => {
    it("should render value and icon correctly", () => {
        const { getByText } = render(
            <Badge icon={<Text>★</Text>} value="4.8" />
        );

        expect(getByText("★")).toBeTruthy();
        expect(getByText("4.8")).toBeTruthy();
    });

    it("should render numeric value correctly", () => {
        const { getByText } = render(
            <Badge value={150} />
        );

        expect(getByText("150")).toBeTruthy();
    });

    it("should trigger onPress callback when pressed", () => {
        const onPressMock = jest.fn();
        const { getByText } = render(
            <Badge value="Test Badge" onPress={onPressMock} />
        );

        fireEvent.press(getByText("Test Badge"));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it("should render icon only when value is undefined or null", () => {
        const { getByText, queryByText } = render(
            <Badge icon={<Text>IconOnly</Text>} />
        );

        expect(getByText("IconOnly")).toBeTruthy();
        expect(queryByText("undefined")).toBeNull();
    });
});
