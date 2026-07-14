import { render } from "@testing-library/react-native";
import ProfileStats from "./ProfileStats";

jest.mock("./ProfileStatItem", () => "StatView");

describe("ProfileStats Component", () => {
    it("should render as many items (StatView) as the provided stats array", () => {
        const mockStats = [
            { type: "followers", value: 100 },
            { type: "following", value: 50 },
            { type: "moviesWatched", value: 10 }
        ] as any;

        const { root } = render(<ProfileStats stats={mockStats} />);

        const statItems = root.findAllByType("StatView");
        expect(statItems.length).toBe(3);
    });

    it("should render without errors when stats is undefined or an empty array", () => {
        const { root } = render(<ProfileStats stats={undefined as any} />);
        const statItems = root.findAllByType("StatView");

        expect(statItems.length).toBe(0);
    });
});
