import { render } from "@testing-library/react-native";
import ProfileBody from "./ProfileBody";
import { useProfileContext } from "../../context/ProfileContext";

jest.mock("../../context/ProfileContext", () => ({
    useProfileContext: jest.fn()
}));

jest.mock("../DynamicList", () => {
    const { Text } = require("react-native");
    return (props: any) => <Text>{props.title}</Text>;
});

describe("ProfileBody Component", () => {
    it("should render lists if there are favorite movies and tracks", () => {
        (useProfileContext as jest.Mock).mockReturnValue({
            bodyData: {
                favoriteMovies: [
                    { id: "m1", title: "Movie Name", poster: "url" }
                ],
                favoriteTracks: [
                    { id: "t1", title: "Track Name", artist: "Artist Name" }
                ]
            }
        });

        const { getByText } = render(<ProfileBody />);

        expect(getByText("Favori Filmler")).toBeTruthy();
        expect(getByText("Favori Şarkılar")).toBeTruthy();
    });

    it("should not show lists if there is no favorite data", () => {
        (useProfileContext as jest.Mock).mockReturnValue({
            bodyData: {
                favoriteMovies: [],
                favoriteTracks: []
            }
        });

        const { queryByText } = render(<ProfileBody />);

        expect(queryByText("Favori Filmler")).toBeNull();
        expect(queryByText("Favori Şarkılar")).toBeNull();
    });
});
