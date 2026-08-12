import React from "react";
import { render } from "@testing-library/react-native";
import AddToListBottomSheet from "./AddToListBottomSheet";

const mockFetchUserLists = jest.fn();
const mockToggleListSelection = jest.fn();

jest.mock("@/hooks/movie/useMovieLists", () => ({
    useMovieLists: () => ({
        lists: [
            { id: "list-1", title: "İzlenecekler", isSystemList: true, listType: "watchlist", isAdded: false },
        ],
        isLoading: false,
        actionLoadingId: null,
        error: "",
        fetchUserLists: mockFetchUserLists,
        toggleListSelection: mockToggleListSelection,
    }),
}));

describe("AddToListBottomSheet Component", () => {
    beforeEach(() => {
        mockFetchUserLists.mockClear();
        mockToggleListSelection.mockClear();
    });

    it("should render sheet title and items when visible", () => {
        const { getByText } = render(
            <AddToListBottomSheet
                isVisible={true}
                onClose={() => {}}
                movieId="movie-123"
            />
        );

        expect(getByText("Listelerime Ekle")).toBeTruthy();
        expect(getByText("İzlenecekler")).toBeTruthy();
        expect(mockFetchUserLists).toHaveBeenCalled();
    });

    it("should not trigger fetchUserLists when isVisible is false", () => {
        render(
            <AddToListBottomSheet
                isVisible={false}
                onClose={() => {}}
                movieId="movie-123"
            />
        );

        expect(mockFetchUserLists).not.toHaveBeenCalled();
    });
});
