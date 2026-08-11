import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import BottomSheet from "./index";

describe("BottomSheet Component", () => {
    const defaultProps = {
        isVisible: true,
        onClose: jest.fn(),
        title: "Test Sheet",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders title and children when visible", () => {
        const { getByText } = render(
            <BottomSheet {...defaultProps}>
                <Text>Sheet Content</Text>
            </BottomSheet>
        );

        expect(getByText("Test Sheet")).toBeTruthy();
        expect(getByText("Sheet Content")).toBeTruthy();
    });

    it("calls onClose when close button is pressed", () => {
        const { getByTestId } = render(
            <BottomSheet {...defaultProps}>
                <Text>Sheet Content</Text>
            </BottomSheet>
        );

        const closeButton = getByTestId("bottom-sheet-close-button");
        fireEvent.press(closeButton);

        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when backdrop is pressed", () => {
        const { getByTestId } = render(
            <BottomSheet {...defaultProps}>
                <Text>Sheet Content</Text>
            </BottomSheet>
        );

        const backdrop = getByTestId("bottom-sheet-backdrop");
        fireEvent.press(backdrop);

        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
});
