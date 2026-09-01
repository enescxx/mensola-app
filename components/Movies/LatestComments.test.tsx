import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LatestComments from "./LatestComments";

const mockRouterPush = jest.fn();

jest.mock("expo-router", () => ({
    useRouter: () => ({
        push: mockRouterPush,
    }),
    useLocalSearchParams: () => ({ movieId: "movie-123" }),
}));

describe("LatestComments Component", () => {
    const mockInteractions = [
        {
            id: "int-1",
            user: { id: "user-1", username: "alice", fullname: "Alice", avatar: "https://example.com/avatar.jpg" },
            comment: { id: "c-1", content: "Muhteşem bir görsel şölen!", date: "2026-08-11T10:00:00Z" },
            rating: 10,
            isLiked: true,
        },
    ];

    beforeEach(() => {
        mockRouterPush.mockClear();
    });

    it("should render header and comments list when comments exist", () => {
        const { getByText } = render(<LatestComments interactions={mockInteractions as any} />);

        expect(getByText("movies.detail.latestComments")).toBeTruthy();
        expect(getByText("movies.detail.seeAll")).toBeTruthy();
        expect(getByText("Muhteşem bir görsel şölen!")).toBeTruthy();
    });

    it("should return null when interaction array is empty", () => {
        const { queryByText } = render(<LatestComments interactions={[]} />);

        expect(queryByText("Son Yorumlar")).toBeNull();
    });

    it("should navigate to all interactions page when 'Hepsini Gör' is pressed", () => {
        const { getByText } = render(<LatestComments interactions={mockInteractions as any} />);

        fireEvent.press(getByText("movies.detail.seeAll"));

        expect(mockRouterPush).toHaveBeenCalledWith({
            pathname: "/movies/[movieId]/interactions",
            params: { movieId: "movie-123" },
        });
    });
});
