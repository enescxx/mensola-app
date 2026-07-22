import { render } from "@testing-library/react-native";
import ProfileFooter from "./ProfileFooter";
import { useProfileContext } from "../../context/ProfileContext";

jest.mock("../../context/ProfileContext", () => ({
    useProfileContext: jest.fn()
}));

jest.mock("./ProfileFooterItem", () => "FooterItem");

describe("ProfileFooter Component", () => {
    it("should iterate over stat data and render them as FooterItems", () => {
        const mockHandleStatPress = jest.fn();
        (useProfileContext as jest.Mock).mockReturnValue({
            footerData: {
                stats: [
                    { type: "followerCount", value: 150 },
                    { type: "followingCount", value: 200 }
                ]
            },
            handleStatPress: mockHandleStatPress
        });

        const { root } = render(<ProfileFooter />);
        const footerItems = root.findAllByType("FooterItem");

        expect(footerItems.length).toBe(2);
    });
});
