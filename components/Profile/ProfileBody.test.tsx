import { render } from "@testing-library/react-native";
import ProfileBody from "./ProfileBody";
import { mockUserData } from "./testMocks";

jest.mock("../DynamicList", () => {
    const { Text } = require("react-native");
    return (props: any) => <Text>{props.title}</Text>;
});

describe("ProfileBody Component", () => {
    it("should render lists if there are favorite movies and tracks", () => {
        const { getByText } = render(
            <ProfileBody
                favoriteMovies={mockUserData.favoriteMovies}
                favoriteTracks={mockUserData.favoriteTracks}
                interactions={[]}
            />
        );

        expect(getByText("Favori Filmler")).toBeTruthy();
        expect(getByText("Favori Şarkılar")).toBeTruthy();
    });

    it("should not show lists if there is no favorite data", () => {
        const { queryByText } = render(
            <ProfileBody
                favoriteMovies={[]}
                favoriteTracks={[]}
                interactions={[]}
            />
        );

        expect(queryByText("Favori Filmler")).toBeNull();
        expect(queryByText("Favori Şarkılar")).toBeNull();
    });
});
