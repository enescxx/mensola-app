import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ArtistCard from "./index";
import { IArtistCardProps } from "./types";

const mockArtistProps: Omit<IArtistCardProps, "type"> = {
    name: "Artist Name",
    avatarUrl: "https://example.com/avatar.jpg",
    followers: "1.5M",
    onPress: jest.fn()
};

describe("ArtistCard Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render artist name correctly", () => {
        const { getByText } = render(<ArtistCard {...mockArtistProps} />);

        expect(getByText("Artist Name")).toBeTruthy();
    });

    it("should display number of followers when provided", () => {
        const { getByText } = render(<ArtistCard {...mockArtistProps} />);

        expect(getByText("1.5M followers")).toBeTruthy();
    });

    it("should trigger onPress when the artist card is pressed", () => {
        const { getByText } = render(<ArtistCard {...mockArtistProps} />);

        const artistName = getByText("Artist Name");
        fireEvent.press(artistName);

        expect(mockArtistProps.onPress).toHaveBeenCalledTimes(1);
    });

    it("should render the avatar image with correct uri", () => {
        const { UNSAFE_getByType } = render(
            <ArtistCard {...mockArtistProps} />
        );

        const imageComponent = UNSAFE_getByType("Image");
        expect(imageComponent.props.source).toEqual({
            uri: mockArtistProps.avatarUrl
        });
    });

    it("should not render followers text when followers is missing", () => {
        const { queryByText } = render(
            <ArtistCard {...mockArtistProps} followers={undefined} />
        );

        expect(queryByText("1.5M followers")).toBeNull();
    });
});
