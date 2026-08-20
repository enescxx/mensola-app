import { render, fireEvent } from "@testing-library/react-native";
import ProfileStatItem from "./ProfileStatItem";
import { StatLabels } from "@/types/stat.types";

describe("ProfileStatItem Component", () => {
    it("should render stat value, correct label, and forward the press event", () => {
        const mockOnPress = jest.fn();

        const { getByText } = render(
            <ProfileStatItem statType="followersCount" statValue={1500} onPress={mockOnPress} />
        );

        expect(getByText("1500")).toBeTruthy();
        expect(getByText(StatLabels["followersCount"])).toBeTruthy();

        fireEvent.press(getByText("1500"));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
        expect(mockOnPress).toHaveBeenCalledWith("followersCount");
    });
});
