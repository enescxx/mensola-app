import { render } from "@testing-library/react-native";
import ProfileView from "./index";

jest.mock("./ProfileHeader", () => "ProfileHeader");
jest.mock("./ProfileBody", () => "ProfileBody");
jest.mock("./ProfileFooter", () => "ProfileFooter");

describe("ProfileView Component", () => {
    it("should render all child components successfully", () => {
        const { UNSAFE_getByType } = render(<ProfileView />);

        expect(UNSAFE_getByType("ProfileHeader")).toBeTruthy();
        expect(UNSAFE_getByType("ProfileBody")).toBeTruthy();
        expect(UNSAFE_getByType("ProfileFooter")).toBeTruthy();
    });
});
