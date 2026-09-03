import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NotificationRow from "./NotificationRow";
import { NotificationItem } from "./types";

describe("NotificationRow Component", () => {
    const mockItem: NotificationItem = {
        id: "notif-1",
        type: "like",
        actor: {
            id: "user-456",
            username: "janedoe",
            fullName: "Jane Doe",
        },
        createdAt: "1h ago",
        isRead: false,
    };

    it("renders actor name and default action text", () => {
        const { getByText } = render(<NotificationRow item={mockItem} />);

        expect(getByText("Jane Doe ")).toBeTruthy();
        expect(getByText(/notifications\.likedYourReview/)).toBeTruthy();
        expect(getByText("1h ago")).toBeTruthy();
    });

    it("triggers onPress when pressed", () => {
        const onPress = jest.fn();
        const { getByTestId } = render(<NotificationRow item={mockItem} onPress={onPress} />);

        fireEvent.press(getByTestId("notification-row-notif-1"));
        expect(onPress).toHaveBeenCalledWith(mockItem);
    });

    it("renders custom message if provided", () => {
        const customItem: NotificationItem = {
            ...mockItem,
            message: "custom message arrived",
        };
        const { getByText } = render(<NotificationRow item={customItem} />);

        expect(getByText(/custom message arrived/)).toBeTruthy();
    });
});
