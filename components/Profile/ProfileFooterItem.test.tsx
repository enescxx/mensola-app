import { render, fireEvent } from "@testing-library/react-native";
import ProfileFooterItem from "./ProfileFooterItem";
import { StatLabels } from "./types";

describe("ProfileFooterItem Component", () => {
    it("should display the correct label, value, and trigger onPress behavior", () => {
        const mockStat = { type: "likedMovies", value: 42 };
        const mockOnPress = jest.fn();

        const { getByText } = render(
            <ProfileFooterItem statData={mockStat} onPress={mockOnPress} />
        );

        expect(getByText(StatLabels["likedMovies"])).toBeTruthy();
        expect(getByText("42")).toBeTruthy();

        fireEvent.press(getByText("42"));

        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});
