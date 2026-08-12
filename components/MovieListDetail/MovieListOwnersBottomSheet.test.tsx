import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MovieListOwnersBottomSheet from "./MovieListOwnersBottomSheet";

const mockRouterPush = jest.fn();

jest.mock("expo-router", () => ({
    useRouter: () => ({
        push: mockRouterPush,
    }),
}));

jest.mock("@/context/AuthContext", () => ({
    useGlobalUser: () => ({
        user: { id: "current-user-id", username: "currentuser" },
    }),
}));

jest.mock("@/hooks/user/useFollow", () => ({
    useFollow: () => ({
        followHandler: jest.fn().mockResolvedValue(true),
        unfollowHandler: jest.fn().mockResolvedValue(true),
        error: "",
    }),
}));

describe("MovieListOwnersBottomSheet Component", () => {
    const mockOwners = [
        {
            id: "user-1",
            username: "creatoruser",
            fullname: "Kurucu Kullanıcı",
            avatar: "https://example.com/avatar1.jpg",
            isFollowing: false,
        },
        {
            id: "user-2",
            username: "editoruser",
            fullname: "Editör Kullanıcı",
            avatar: "https://example.com/avatar2.jpg",
            isFollowing: true,
        },
    ];

    beforeEach(() => {
        mockRouterPush.mockClear();
    });

    it("should render bottom sheet title and owners list correctly", () => {
        const { getByText } = render(
            <MovieListOwnersBottomSheet
                isVisible={true}
                onClose={() => {}}
                owners={mockOwners as any}
                creatorId="user-1"
            />
        );

        expect(getByText("Yöneticiler")).toBeTruthy();
        expect(getByText("Kurucu Kullanıcı")).toBeTruthy();
        expect(getByText("Editör Kullanıcı")).toBeTruthy();
    });

    it("should navigate to user profile when owner card is pressed", () => {
        const { getByText } = render(
            <MovieListOwnersBottomSheet
                isVisible={true}
                onClose={() => {}}
                owners={mockOwners as any}
                creatorId="user-1"
            />
        );

        fireEvent.press(getByText("Editör Kullanıcı"));

        expect(mockRouterPush).toHaveBeenCalledWith("/users/user-2");
    });
});
