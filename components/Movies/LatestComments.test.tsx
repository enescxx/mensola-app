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
        const { getByText, queryByText } = render(<LatestComments interactions={mockInteractions as any} />);

        expect(getByText("movies.detail.latestComments")).toBeTruthy();
        expect(queryByText("movies.detail.seeAll")).toBeNull();
        expect(getByText("Muhteşem bir görsel şölen!")).toBeTruthy();
    });

    it("should render empty state and trigger onRateReviewPress when interaction array is empty", () => {
        const onRateReviewPress = jest.fn();
        const { getByText, getByTestId } = render(
            <LatestComments interactions={[]} onRateReviewPress={onRateReviewPress} />
        );

        expect(getByText("movies.detail.emptyReviewsText")).toBeTruthy();
        expect(getByText("movies.detail.rateAndReview")).toBeTruthy();

        fireEvent.press(getByTestId("movies-rate-review-button"));
        expect(onRateReviewPress).toHaveBeenCalledTimes(1);
    });

    it("should have See All button hidden for beta release", () => {
        const { queryByText } = render(<LatestComments interactions={mockInteractions as any} />);

        expect(queryByText("movies.detail.seeAll")).toBeNull();
        expect(mockRouterPush).not.toHaveBeenCalled();
    });
});
