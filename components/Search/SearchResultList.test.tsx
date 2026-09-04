import React from "react";
import { render } from "@testing-library/react-native";
import SearchResultList from "./SearchResultList";

jest.mock("expo-router", () => ({
    useRouter: () => ({ push: jest.fn() }),
    useLocalSearchParams: () => ({}),
}));

jest.mock("@/context/AuthContext", () => ({
    useGlobalUser: () => ({ user: { id: "user-123" } }),
}));

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                "search.emptyState.noResultsTitle": "Sonuç Bulunamadı",
                "search.emptyState.noResultsDescription":
                    "Aradığınız kriterlere uygun içerik bulamadık. Farklı kelimelerle aramayı deneyebilirsiniz.",
                "common.retry": "Tekrar Deneyin",
            };
            return translations[key] || key;
        },
    }),
}));

describe("SearchResultList Component", () => {
    const defaultProps = {
        activeTab: "movie" as const,
        results: [],
        fetchNextPage: jest.fn(),
        isLoading: false,
        refetch: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isError: false,
        error: null,
        addSearch: jest.fn(),
    };

    test("renders SearchNoResults when results array is empty and loading is complete", () => {
        const { getByText } = render(<SearchResultList {...defaultProps} results={[]} isLoading={false} />);

        expect(getByText("Sonuç Bulunamadı")).toBeTruthy();
        expect(
            getByText("Aradığınız kriterlere uygun içerik bulamadık. Farklı kelimelerle aramayı deneyebilirsiniz.")
        ).toBeTruthy();
    });

    test("does not render SearchNoResults when isLoading is true", () => {
        const { queryByText } = render(<SearchResultList {...defaultProps} results={[]} isLoading={true} />);

        expect(queryByText("Sonuç Bulunamadı")).toBeNull();
    });

    test("renders error message when isError is true", () => {
        const { getByText } = render(
            <SearchResultList {...defaultProps} isError={true} error={new Error("Something went wrong")} />
        );

        expect(getByText("Something went wrong")).toBeTruthy();
        expect(getByText("Tekrar Deneyin")).toBeTruthy();
    });
});
