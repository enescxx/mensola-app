import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LatestComments from "./LatestComments";

const mockRouterPush = jest.fn();

jest.mock("expo-router", () => ({
    useRouter: () => ({
        push: mockRouterPush,
    }),
    useLocalSearchParams: () => ({ trackId: "track-123" }),
}));

describe("TrackDetail LatestComments Component", () => {
    beforeEach(() => {
        mockRouterPush.mockClear();
    });

    it("should render empty state and trigger onRateReviewPress when interaction array is empty", () => {
        const onRateReviewPress = jest.fn();
        const { getByText, getByTestId } = render(
            <LatestComments interactions={[]} onRateReviewPress={onRateReviewPress} />
        );

        expect(getByText("tracks.detail.emptyReviewsText")).toBeTruthy();
        expect(getByText("tracks.detail.rateAndReview")).toBeTruthy();

        fireEvent.press(getByTestId("tracks-rate-review-button"));
        expect(onRateReviewPress).toHaveBeenCalledTimes(1);
    });
});
