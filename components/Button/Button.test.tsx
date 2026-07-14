import { render, fireEvent } from "@testing-library/react-native";
import Button from "./index";

describe("Button Component", () => {
    it("should render label correctly", () => {
        const { getByText } = render(
            <Button label="Giriş Yap" onPress={() => {}} />
        );

        expect(getByText("Giriş Yap")).toBeTruthy();
    });

    it("should call onPress when pressed", () => {
        const mockOnPress = jest.fn();

        const { getByText } = render(
            <Button label="Giriş Yap" onPress={mockOnPress} />
        );

        const button = getByText("Giriş Yap");
        fireEvent.press(button);

        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});
