import { render } from "@testing-library/react-native";
import ProfileFooter from "./ProfileFooter";

jest.mock("./ProfileFooterItem", () => "FooterItem");

describe("ProfileFooter Component", () => {
    it("should iterate over stat data and render them as FooterItems", () => {
        const mockStats = [
            { type: "likedMovies", value: 12 },
            { type: "movieLists", value: 3 }
        ] as any;

        const { root } = render(<ProfileFooter stats={mockStats} />);
        const footerItems = root.findAllByType("FooterItem");

        expect(footerItems.length).toBe(2);
    });
});
