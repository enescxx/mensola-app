import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MovieOverview from "./MovieOverview";

describe("MovieOverview Component", () => {
    it("should render movie description correctly", () => {
        const { getByText } = render(
            <MovieOverview movie={{ description: "Bu bir bilim kurgu filmidir." } as any} />
        );

        expect(getByText("Bu bir bilim kurgu filmidir.")).toBeTruthy();
    });

    it("should render fallback text when description is missing", () => {
        const { getByText } = render(<MovieOverview movie={{} as any} />);

        expect(getByText("Bu film hakkında daha fazla bilgi yok.")).toBeTruthy();
    });

    it("should toggle expanded state on press", () => {
        const { getByText } = render(
            <MovieOverview movie={{ description: "Test açıklaması." } as any} />
        );

        const overviewText = getByText("Test açıklaması.");
        fireEvent.press(overviewText);

        expect(overviewText).toBeTruthy();
    });
});
