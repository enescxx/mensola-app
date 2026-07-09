import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MusicCard from "./index";
import { IMusicCardProps } from "./types";

const mockSongProps: Omit<IMusicCardProps, "type"> = {
    title: "Music Title",
    subtitle: "Artist Name",
    coverImage: "https://example.com/cover.jpg",
    duration: "3:17",
    onPress: jest.fn()
};

const mockAlbumProps: Omit<IMusicCardProps, "type"> = {
    title: "Album Title",
    subtitle: "Artist Name",
    coverImage: "https://example.com/cover.jpg",
    releaseYear: 2026,
    onPress: jest.fn()
};

const mockPlaylistProps: Omit<IMusicCardProps, "type"> = {
    title: "Playlist Title",
    subtitle: "Creator",
    coverImage: "https://example.com/cover.jpg",
    songCount: 50,
    onPress: jest.fn()
};

describe("MusicCard Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render title and subtitle correctly", () => {
        const { getByText } = render(
            <MusicCard type="song" {...mockSongProps} duration={undefined} />
        );

        expect(getByText("Music Title")).toBeTruthy();
        expect(getByText("Artist Name")).toBeTruthy();
    });

    it("should display duration when type is 'song'", () => {
        const { getByText } = render(
            <MusicCard type="song" {...mockSongProps} />
        );

        expect(getByText("Artist Name • 3:17")).toBeTruthy();
    });

    it("should display release year when type is 'album'", () => {
        const { getByText } = render(
            <MusicCard type="album" {...mockAlbumProps} />
        );

        expect(getByText("Artist Name • 2026")).toBeTruthy();
    });

    it("should display song count when type is 'playlist'", () => {
        const { getByText } = render(
            <MusicCard type="playlist" {...mockPlaylistProps} />
        );

        expect(getByText("Creator • 50 Şarkı")).toBeTruthy();
    });

    it("should trigger onPress when the card is pressed", () => {
        const { getByText } = render(
            <MusicCard type="song" {...mockSongProps} />
        );

        const cardTitle = getByText("Music Title");

        fireEvent.press(cardTitle);

        expect(mockSongProps.onPress).toHaveBeenCalledTimes(1);
    });

    it("should render the cover image with correct uri", () => {
        const { UNSAFE_getByType } = render(
            <MusicCard type="song" {...mockSongProps} />
        );

        const imageComponent = UNSAFE_getByType("Image");
        expect(imageComponent.props.source).toEqual({
            uri: mockSongProps.coverImage
        });
    });

    it("should render only the subtitle without dot separator when extra info is missing", () => {
        const { getByText } = render(
            <MusicCard type="song" {...mockSongProps} duration={undefined} />
        );

        expect(getByText("Artist Name")).toBeTruthy();
    });
});
