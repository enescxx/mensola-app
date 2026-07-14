import { render, fireEvent } from "@testing-library/react-native";
import ProfileStatItem from "./ProfileStatItem";
import { StatLabels } from "./types";

describe("ProfileStatItem Component", () => {
    it("should render stat value, correct label, and forward the press event", () => {
        const mockStat = { type: "followers", value: 1500 } as any;
        const mockOnPress = jest.fn();

        const { getByText } = render(
            <ProfileStatItem statData={mockStat} onPress={mockOnPress} />
        );

        expect(getByText("1500")).toBeTruthy();
        expect(getByText(StatLabels["followers"])).toBeTruthy();

        fireEvent.press(getByText("1500"));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
        expect(mockOnPress).toHaveBeenCalledWith("followers");
    });
});
