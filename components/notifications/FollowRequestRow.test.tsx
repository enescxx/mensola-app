import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FollowRequestRow from "./FollowRequestRow";
import { NotificationItem } from "./types";

describe("FollowRequestRow Component", () => {
    const mockItem: NotificationItem = {
        id: "req-1",
        type: "follow_request",
        actor: {
            id: "user-123",
            username: "johndoe",
            fullName: "John Doe",
        },
        createdAt: "2m ago",
        isRead: false,
        status: "pending",
    };

    it("renders actor name and follow request text", () => {
        const { getByText } = render(<FollowRequestRow item={mockItem} />);

        expect(getByText("John Doe")).toBeTruthy();
        expect(getByText("notifications.wantsToFollow")).toBeTruthy();
        expect(getByText("2m ago")).toBeTruthy();
    });

    it("triggers onAccept when Accept button is pressed", () => {
        const onAccept = jest.fn();
        const { getByTestId } = render(<FollowRequestRow item={mockItem} onAccept={onAccept} />);

        fireEvent.press(getByTestId("accept-request-req-1"));
        expect(onAccept).toHaveBeenCalledWith("req-1");
    });

    it("triggers onDecline when Decline button is pressed", () => {
        const onDecline = jest.fn();
        const { getByTestId } = render(<FollowRequestRow item={mockItem} onDecline={onDecline} />);

        fireEvent.press(getByTestId("decline-request-req-1"));
        expect(onDecline).toHaveBeenCalledWith("req-1");
    });

    it("renders accepted badge when status is accepted", () => {
        const acceptedItem: NotificationItem = { ...mockItem, status: "accepted" };
        const { getByText, queryByTestId } = render(<FollowRequestRow item={acceptedItem} />);

        expect(getByText("notifications.accepted")).toBeTruthy();
        expect(queryByTestId("accept-request-req-1")).toBeNull();
    });

    it("renders declined badge when status is declined", () => {
        const declinedItem: NotificationItem = { ...mockItem, status: "declined" };
        const { getByText, queryByTestId } = render(<FollowRequestRow item={declinedItem} />);

        expect(getByText("notifications.declined")).toBeTruthy();
        expect(queryByTestId("decline-request-req-1")).toBeNull();
    });
});
