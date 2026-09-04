import React from "react";
import { render } from "@testing-library/react-native";
import SearchNoResults from "./SearchNoResults";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                "search.emptyState.noResultsTitle": "Sonuç Bulunamadı",
                "search.emptyState.noResultsDescription":
                    "Aradığınız kriterlere uygun içerik bulamadık. Farklı kelimelerle aramayı deneyebilirsiniz.",
            };
            return translations[key] || key;
        },
    }),
}));

describe("SearchNoResults Component", () => {
    test("renders empty state title and description correctly", () => {
        const { getByText } = render(<SearchNoResults />);

        expect(getByText("Sonuç Bulunamadı")).toBeTruthy();
        expect(
            getByText("Aradığınız kriterlere uygun içerik bulamadık. Farklı kelimelerle aramayı deneyebilirsiniz.")
        ).toBeTruthy();
    });

    test("renders with onRefresh handler without crashing", () => {
        const mockRefresh = jest.fn();
        const { getByText } = render(<SearchNoResults onRefresh={mockRefresh} refreshing={false} />);

        expect(getByText("Sonuç Bulunamadı")).toBeTruthy();
    });
});
