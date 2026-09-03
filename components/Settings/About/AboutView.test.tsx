import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Linking } from "react-native";
import AboutView from "./index";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string, params?: { version?: string }) => {
            const translations: Record<string, string> = {
                "settings.about.version": `Version ${params?.version || "1.0.0"} (Beta)`,
                "settings.about.legalTitle": "LEGAL",
                "settings.about.privacyPolicy": "Privacy Policy",
                "settings.about.termsOfService": "Terms of Service",
                "settings.about.attributionsTitle": "DATA & ATTRIBUTIONS",
                "settings.about.tmdbTitle": "Movie & TV data provided by TMDb.",
                "settings.about.tmdbDesc": "This product uses the TMDB API but is not endorsed or certified by TMDB.",
                "settings.about.spotifyTitle": "Music metadata powered by Spotify Web API.",
                "settings.about.footerText": "Built with passion by indie developers",
                "settings.about.copyright": "© 2026 mensola. All rights reserved.",
            };
            return translations[key] || key;
        },
    }),
}));

describe("AboutView Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(Linking, "openURL").mockImplementation(() => Promise.resolve(true));
    });

    it("renders app name, version, and headers correctly", () => {
        const { getByText } = render(<AboutView />);

        expect(getByText("mensola")).toBeTruthy();
        expect(getByText(/Version/)).toBeTruthy();
        expect(getByText("LEGAL")).toBeTruthy();
        expect(getByText("DATA & ATTRIBUTIONS")).toBeTruthy();
    });

    it("opens Privacy Policy URL when clicked", () => {
        const { getByTestId } = render(<AboutView />);
        const privacyItem = getByTestId("about-privacy-policy");

        fireEvent.press(privacyItem);
        expect(Linking.openURL).toHaveBeenCalledWith("https://mensola.app/privacy-policy");
    });

    it("opens Terms of Service URL when clicked", () => {
        const { getByTestId } = render(<AboutView />);
        const termsItem = getByTestId("about-terms-of-service");

        fireEvent.press(termsItem);
        expect(Linking.openURL).toHaveBeenCalledWith("https://mensola.app/terms");
    });

    it("opens TMDB URL when clicked", () => {
        const { getByTestId } = render(<AboutView />);
        const tmdbItem = getByTestId("about-tmdb");

        fireEvent.press(tmdbItem);
        expect(Linking.openURL).toHaveBeenCalledWith("https://www.themoviedb.org");
    });

    it("opens Spotify URL when clicked", () => {
        const { getByTestId } = render(<AboutView />);
        const spotifyItem = getByTestId("about-spotify");

        fireEvent.press(spotifyItem);
        expect(Linking.openURL).toHaveBeenCalledWith("https://www.spotify.com");
    });

    it("renders footer and copyright text", () => {
        const { getByText } = render(<AboutView />);

        expect(getByText("Built with passion by indie developers")).toBeTruthy();
        expect(getByText("© 2026 mensola. All rights reserved.")).toBeTruthy();
    });
});
