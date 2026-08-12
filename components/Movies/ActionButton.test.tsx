import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ActionButton from "./ActionButton";

describe("ActionButton Component", () => {
    it("should render icon correctly", () => {
        const { getByText } = render(
            <ActionButton icon="heart" isActive={false} activeColor="#FF8000" onPress={() => {}} />
        );

        expect(getByText("heart")).toBeTruthy();
    });

    it("should trigger onPress when pressed and not disabled", () => {
        const onPressMock = jest.fn();
        const { getByText } = render(
            <ActionButton icon="bookmark" isActive={false} activeColor="#FF8000" onPress={onPressMock} />
        );

        fireEvent.press(getByText("bookmark"));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it("should disable button when isLoading or disabled prop is true", () => {
        const onPressMock = jest.fn();
        const { queryByText } = render(
            <ActionButton icon="star" isActive={false} activeColor="#FF8000" onPress={onPressMock} isLoading={true} />
        );

        expect(queryByText("star")).toBeNull();
    });
});
