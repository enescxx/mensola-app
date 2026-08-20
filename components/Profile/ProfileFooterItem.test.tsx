import { render, fireEvent } from "@testing-library/react-native";
import ProfileFooterItem from "./ProfileFooterItem";
import { StatLabels } from "@/types/stat.types";

describe("ProfileFooterItem Component", () => {
    it("should display the correct label, value, and trigger onPress behavior", () => {
        const mockOnPress = jest.fn();

        const { getByText } = render(
            <ProfileFooterItem statType="likedMoviesCount" statValue={42} onPress={mockOnPress} />
        );

        expect(getByText(StatLabels["likedMoviesCount"])).toBeTruthy();
        expect(getByText("42")).toBeTruthy();

        fireEvent.press(getByText("42"));

        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});
