import { render } from "@testing-library/react-native";
import ProfileView from "./index";
import { mockUserData } from "./testMocks";

jest.mock("./ProfileHeader", () => "ProfileHeader");
jest.mock("./ProfileBody", () => "ProfileBody");
jest.mock("./ProfileFooter", () => "ProfileFooter");

describe("ProfileView Component", () => {
    it("should correctly filter stat data and pass it to the Header component", () => {
        const { root } = render(
            <ProfileView userData={mockUserData} isOwnProfile={false} />
        );

        const header = root.findByType("ProfileHeader");

        const headerStats = header.props.userData.stats;

        expect(headerStats.length).toBe(3);
        expect(headerStats.map(s => s.type)).not.toContain("likedMovies");
        expect(headerStats.map(s => s.type)).toEqual(
            expect.arrayContaining(["followers", "following", "moviesWatched"])
        );
    });

    it("should render all child components successfully", () => {
        const { root } = render(
            <ProfileView userData={mockUserData} isOwnProfile={true} />
        );

        expect(root.findByType("ProfileHeader")).toBeTruthy();
        expect(root.findByType("ProfileBody")).toBeTruthy();
        expect(root.findByType("ProfileFooter")).toBeTruthy();
    });
});
