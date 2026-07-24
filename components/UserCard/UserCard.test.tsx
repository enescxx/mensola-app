import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import UserCard from "./index";

const mockUser = {
    id: "user-123",
    username: "johndoe",
    fullname: "John Doe",
    avatar: "https://example.com/avatar.jpg",
    isFollowing: false,
    isFollower: false
};

describe("UserCard component", () => {
    const mockOnFollowPress = jest.fn();
    const mockOnCardPress = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders user details (fullname and username) correctly", () => {
        const { getByText } = render(
            <UserCard
                user={mockUser}
                currentUserId="current-user"
                onFollowPress={mockOnFollowPress}
                onCardPress={mockOnCardPress}
            />
        );

        expect(getByText("@johndoe")).toBeTruthy();
        expect(getByText("John Doe")).toBeTruthy();
    });

    it("does NOT render the follow button when viewing own profile (isSelf)", () => {
        const { queryByText } = render(
            <UserCard
                user={mockUser}
                currentUserId={mockUser.id}
                onFollowPress={mockOnFollowPress}
                onCardPress={mockOnCardPress}
            />
        );

        expect(queryByText("Takip Et")).toBeNull();
        expect(queryByText("Sen de Takip Et")).toBeNull();
        expect(queryByText("Takip Ediliyor")).toBeNull();
    });

    it("renders 'Takip Et' button when not following the user", () => {
        const { getByText } = render(
            <UserCard
                user={{ ...mockUser, isFollowing: false, isFollower: false }}
                currentUserId="current-user"
                onFollowPress={mockOnFollowPress}
                onCardPress={mockOnCardPress}
            />
        );

        expect(getByText("Takip Et")).toBeTruthy();
    });

    it("renders 'Sen de Takip Et' button when the user follows current user back", () => {
        const { getByText } = render(
            <UserCard
                user={{ ...mockUser, isFollowing: false, isFollower: true }}
                currentUserId="current-user"
                onFollowPress={mockOnFollowPress}
                onCardPress={mockOnCardPress}
            />
        );

        expect(getByText("Sen de Takip Et")).toBeTruthy();
    });

    it("renders 'Takip Ediliyor' button when already following the user", () => {
        const { getByText } = render(
            <UserCard
                user={{ ...mockUser, isFollowing: true }}
                currentUserId="current-user"
                onFollowPress={mockOnFollowPress}
                onCardPress={mockOnCardPress}
            />
        );

        expect(getByText("Takip Ediliyor")).toBeTruthy();
    });

    it("calls onCardPress with user.id when the card is pressed", () => {
        const { getByText } = render(
            <UserCard
                user={mockUser}
                currentUserId="current-user"
                onFollowPress={mockOnFollowPress}
                onCardPress={mockOnCardPress}
            />
        );

        fireEvent.press(getByText("@johndoe"));

        expect(mockOnCardPress).toHaveBeenCalledTimes(1);
        expect(mockOnCardPress).toHaveBeenCalledWith("user-123");
    });

    it("calls onFollowPress with (id, isFollowing) when the follow button is pressed", () => {
        const { getByText } = render(
            <UserCard
                user={{ ...mockUser, isFollowing: true }}
                currentUserId="current-user"
                onFollowPress={mockOnFollowPress}
                onCardPress={mockOnCardPress}
            />
        );

        fireEvent.press(getByText("Takip Ediliyor"));

        expect(mockOnFollowPress).toHaveBeenCalledTimes(1);
        expect(mockOnFollowPress).toHaveBeenCalledWith("user-123", true);
    });
});
