import React from "react";
import { render } from "@testing-library/react-native";
import InteractionSheet from "./index";

jest.mock("react-i18next", () => {
    const mockTr = require("@/locales/tr.json");
    return {
        useTranslation: () => ({
            t: (key: string) => {
                const keys = key.split(".");
                let val: any = mockTr;
                for (const k of keys) {
                    val = val?.[k];
                }
                return val || key;
            },
        }),
    };
});

describe("InteractionSheet Component", () => {
    const defaultProps = {
        isVisible: true,
        onClose: jest.fn(),
        targetType: "movie" as const,
        targetId: "movie-123" as any,
        mediaTitle: "The Odyssey",
        onSubmit: jest.fn(),
    };

    it("renders translated interaction sheet texts correctly in Turkish", () => {
        const { getByText, getByPlaceholderText } = render(<InteractionSheet {...defaultProps} />);

        // Translations from tr.json
        expect(getByText("Değerlendir & Yorum Yap")).toBeTruthy();
        expect(getByText("Puanınız")).toBeTruthy();
        expect(getByText("Puan Seçilmedi")).toBeTruthy();
        expect(getByText("Beğenilerine Ekle")).toBeTruthy();
        expect(getByText("Yorumunuz (İsteğe Bağlı)")).toBeTruthy();
        expect(getByPlaceholderText("Bu içerik hakkında düşüncelerinizi yazın...")).toBeTruthy();
        expect(getByText("Kaydet")).toBeTruthy();
        expect(getByText("The Odyssey")).toBeTruthy();
    });
});
