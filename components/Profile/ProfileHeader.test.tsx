import { render } from "@testing-library/react-native";
import ProfileHeader from "./ProfileHeader";
import { useProfileContext } from "../../context/ProfileContext";

jest.mock("../../context/ProfileContext", () => ({
    useProfileContext: jest.fn()
}));

const mockHandleStatPress = jest.fn();

describe("ProfileHeader Component", () => {
    it("should display username, fullname, and bio if they exist", () => {
        (useProfileContext as jest.Mock).mockReturnValue({
            headerData: {
                username: "janedoe",
                fullname: "Jane Doe",
                bio: "Test bio",
                profilePicture: "url",
                stats: []
            },
            handleStatPress: mockHandleStatPress
        });

        const { getByText } = render(<ProfileHeader />);

        expect(getByText("@janedoe")).toBeTruthy();
        expect(getByText("Jane Doe")).toBeTruthy();
        expect(getByText("Test bio")).toBeTruthy();
    });

    it("should not crash and only display username if fullname and bio are missing", () => {
        (useProfileContext as jest.Mock).mockReturnValue({
            headerData: {
                username: "janedoe",
                profilePicture: "url",
                stats: []
            },
            handleStatPress: mockHandleStatPress
        });

        const { getByText, queryByText } = render(<ProfileHeader />);

        expect(getByText("@janedoe")).toBeTruthy();
        expect(queryByText("Test bio")).toBeNull();
    });
});
