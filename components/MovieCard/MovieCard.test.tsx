import React from "react";
import { render } from "@testing-library/react-native";
import MovieCard from "./index";

describe("MovieCard Bileşeni Bütünsel Testleri", () => {
    it("should render image, rating, and icon names for profile variant but must not display any interaction counts", () => {
        const profileMovie = {
            title: "Movie Name",
            poster: "https://example.com/posster.jpg",
            interactions: {
                rating: "4.8",
                isLiked: true
            }
        };

        const { getByText, getByLabelText, queryByText } = render(
            <MovieCard {...profileMovie} variant="profile" />
        );

        expect(getByLabelText("Movie Name")).toBeTruthy();

        expect(getByText("4.8")).toBeTruthy();

        expect(getByText("heart")).toBeTruthy();
        expect(queryByText("text")).toBeNull();
    });

    it("should render all interaction metrics as numbers when variant is set to feed", () => {
        const feedMovie = {
            title: "Movie Name",
            poster: "https://example.com/poster.jpg",
            interactions: {
                rating: "4.8",
                totalLikes: 1500,
                totalReviews: 240
            }
        };

        const { getByText, getByLabelText } = render(
            <MovieCard {...feedMovie} variant="feed" />
        );

        expect(getByLabelText("Movie Name")).toBeTruthy();

        expect(getByText("4.8")).toBeTruthy();
        expect(getByText("1500")).toBeTruthy();
        expect(getByText("240")).toBeTruthy();
    });

    it("should render successfully without crashing when interactions prop is undefined", () => {
        const { queryByText, getByLabelText } = render(
            <MovieCard
                title="Movie Name"
                poster="https://example.com/poster.jpg"
            />
        );

        expect(getByLabelText("Movie Name")).toBeTruthy();

        expect(queryByText("4.8")).toBeNull();
    });

    it("should safely hide interaction sub-components when numerical values are zero", () => {
        const zeroMovie = {
            title: "Movie Name",
            poster: "https://example.com/poster.jpg",
            interactions: {
                rating: "5.0",
                totalReviews: 0,
                totalReviews: 0
            }
        };

        const { getByText, queryByText, getByLabelText } = render(
            <MovieCard {...zeroMovie} variant="feed" />
        );

        expect(getByLabelText("Movie Name")).toBeTruthy();

        expect(getByText("5.0")).toBeTruthy();
        expect(queryByText("0")).toBeNull();
    });
});
