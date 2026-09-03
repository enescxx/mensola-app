import React from "react";
import { render } from "@testing-library/react-native";
import NotificationEmptyState from "./NotificationEmptyState";

describe("NotificationEmptyState Component", () => {
    it("renders default empty state texts correctly", () => {
        const { getByText, getByTestId } = render(<NotificationEmptyState />);

        expect(getByTestId("notification-empty-state")).toBeTruthy();
        expect(getByText("notifications.emptyTitle")).toBeTruthy();
        expect(getByText("notifications.emptySubtitle")).toBeTruthy();
    });

    it("renders custom title and message when provided", () => {
        const { getByText } = render(
            <NotificationEmptyState title="Custom Empty Title" message="Custom empty message description" />
        );

        expect(getByText("Custom Empty Title")).toBeTruthy();
        expect(getByText("Custom empty message description")).toBeTruthy();
    });
});
