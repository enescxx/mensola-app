import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchUserRow from "./SearchUserRow";

describe("SearchUserRow Component", () => {
    const mockUser = {
        id: "user-1",
        username: "enescan",
        fullname: "Enes Can",
        avatar: "https://example.com/avatar.jpg",
    };

    test("renders fullname and @username correctly", () => {
        const onPress = jest.fn();
        const { getByText, queryByText } = render(
            <SearchUserRow user={mockUser} onPress={onPress} />
        );

        expect(getByText("Enes Can")).toBeTruthy();
        expect(getByText("@enescan")).toBeTruthy();
        // Ensure no follow button or text exists
        expect(queryByText("Takip Et")).toBeNull();
        expect(queryByText("Takip")).toBeNull();
        expect(queryByText("Follow")).toBeNull();
    });

    test("renders only @username when fullname is missing", () => {
        const onPress = jest.fn();
        const userWithoutFullname = {
            id: "user-2",
            username: "johndoe",
            fullname: null,
            avatar: null,
        };
        const { getByText } = render(
            <SearchUserRow user={userWithoutFullname} onPress={onPress} />
        );

        expect(getByText("@johndoe")).toBeTruthy();
    });

    test("triggers onPress when clicked", () => {
        const onPress = jest.fn();
        const { getByRole } = render(
            <SearchUserRow user={mockUser} onPress={onPress} />
        );

        const row = getByRole("button");
        fireEvent.press(row);

        expect(onPress).toHaveBeenCalledTimes(1);
    });
});
