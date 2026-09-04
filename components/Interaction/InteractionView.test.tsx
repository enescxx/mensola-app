import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InteractionView from "./index";

const mockRouterPush = jest.fn();

jest.mock("expo-router", () => ({
    useRouter: () => ({
        push: mockRouterPush,
    }),
}));

describe("InteractionView Component", () => {
    const mockData = {
        id: "int-123",
        user: {
            id: "user-456",
            username: "johndoe",
            fullname: "John Doe",
            avatar: "https://example.com/avatar.jpg",
        },
        comment: {
            id: "comment-789",
            content: "Bu gerçekten harika bir filmdi!",
            date: "2026-08-10T12:00:00Z",
        },
        rating: 9,
        isLiked: true,
        likesCount: 15,
        replyCount: 3,
    };

    beforeEach(() => {
        mockRouterPush.mockClear();
    });

    it("should render user info, comment content, and interaction metrics correctly", () => {
        const { getByText } = render(<InteractionView data={mockData} />);

        expect(getByText("John Doe")).toBeTruthy();
        expect(getByText("@johndoe")).toBeTruthy();
        expect(getByText("Bu gerçekten harika bir filmdi!")).toBeTruthy();
        expect(getByText("15")).toBeTruthy();
        expect(getByText("3")).toBeTruthy();
    });

    it("should navigate to user profile when user card is pressed", () => {
        const { getByText } = render(<InteractionView data={mockData} />);

        fireEvent.press(getByText("John Doe"));

        expect(mockRouterPush).toHaveBeenCalledWith({
            pathname: "/users/[userId]",
            params: { userId: "user-456" },
        });
    });

    it("should not navigate to interaction detail when interaction card is pressed by default (disabled for beta)", () => {
        const { getByText } = render(<InteractionView data={mockData} />);

        fireEvent.press(getByText("Bu gerçekten harika bir filmdi!"));

        expect(mockRouterPush).not.toHaveBeenCalled();
    });

    it("should navigate to interaction detail when disabled is explicitly false", () => {
        const { getByText } = render(<InteractionView data={mockData} disabled={false} />);

        fireEvent.press(getByText("Bu gerçekten harika bir filmdi!"));

        expect(mockRouterPush).toHaveBeenCalledWith({
            pathname: "/interactions/[interactionId]",
            params: { interactionId: "int-123" },
        });
    });

    it("should fall back to username when fullname is missing", () => {
        const dataWithoutFullname = {
            ...mockData,
            user: {
                ...mockData.user,
                fullname: "",
            },
        };

        const { getAllByText } = render(<InteractionView data={dataWithoutFullname} />);

        expect(getAllByText("johndoe").length).toBeGreaterThan(0);
    });
});
