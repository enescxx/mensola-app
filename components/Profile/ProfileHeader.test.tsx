import { render } from "@testing-library/react-native";
import ProfileHeader from "./ProfileHeader";

describe("ProfileHeader Component", () => {
    it("should display username, fullname, and bio if they exist", () => {
        const userData = {
            username: "janedoe",
            fullname: "Jane Doe",
            bio: "Test bio",
            profilePicture: "url",
            stats: []
        };
        const { getByText } = render(<ProfileHeader userData={userData} />);

        expect(getByText("@janedoe")).toBeTruthy();
        expect(getByText("Jane Doe")).toBeTruthy();
        expect(getByText("Test bio")).toBeTruthy();
    });

    it("should not crash and only display username if fullname and bio are missing", () => {
        const userData = {
            username: "janedoe",
            profilePicture: "url",
            stats: []
        };
        const { getByText, queryByText } = render(
            <ProfileHeader userData={userData} />
        );

        expect(getByText("@janedoe")).toBeTruthy();
        expect(queryByText("Test bio")).toBeNull();
    });
});
