import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MusicCard from "./index";
import { IMusicCardProps } from "./types";

const mockSongProps: Omit<IMusicCardProps, "type"> = {
    title: "Music Title",
    artists: [{ name: "Artist 1" }, { name: "Artist 2" }],
    image: "https://example.com/cover.jpg",
    duration: 197
};

const mockAlbumProps: Omit<IMusicCardProps, "type"> = {
    title: "Album Title",
    artists: [{ name: "Artist 1" }, { name: "Artist 2" }],
    image: "https://example.com/cover.jpg",
    releaseYear: 2026
};

const mockPlaylistProps: Omit<IMusicCardProps, "type"> = {
    title: "Playlist Title",
    creator: { username: "enescxx" },
    image: "https://example.com/cover.jpg",
    songCount: 50
};

describe("MusicCard Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render title and subtitle correctly", () => {
        const { getByText } = render(
            <MusicCard type="song" data={mockSongProps} />
        );

        expect(getByText("Music Title")).toBeTruthy();
        expect(getByText("Artist 1, Artist 2 • 03:17")).toBeTruthy();
    });

    it("should display duration when type is 'song'", () => {
        const { getByText } = render(
            <MusicCard type="song" data={mockSongProps} />
        );

        expect(getByText("Artist 1, Artist 2 • 03:17")).toBeTruthy();
    });

    it("should display release year when type is 'album'", () => {
        const { getByText } = render(
            <MusicCard type="album" data={mockAlbumProps} />
        );

        expect(getByText("Artist 1, Artist 2 • 2026")).toBeTruthy();
    });

    it("should display song count when type is 'playlist'", () => {
        const { getByText } = render(
            <MusicCard type="playlist" data={mockPlaylistProps} />
        );

        expect(getByText("@enescxx • 50 Şarkı")).toBeTruthy();
    });

    it("should trigger onPress when the card is pressed", () => {
        const onPressMock = jest.fn();

        const { getByText } = render(
            <MusicCard type="song" data={mockSongProps} onPress={onPressMock} />
        );

        const cardTitle = getByText("Music Title");

        fireEvent.press(cardTitle);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it("should render the cover image with correct uri", () => {
        const { UNSAFE_getByType } = render(
            <MusicCard type="song" data={mockSongProps} />
        );

        const imageComponent = UNSAFE_getByType("Image");
        expect(imageComponent.props.source).toEqual({
            uri: mockSongProps.image
        });
    });

    it("should render only the subtitle without dot separator when extra info is missing", () => {
        const { getByText } = render(
            <MusicCard
                type="song"
                data={{ ...mockSongProps, duration: undefined }}
            />
        );

        expect(getByText("Artist 1, Artist 2")).toBeTruthy();
    });
});
