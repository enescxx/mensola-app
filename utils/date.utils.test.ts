import { formatRelativeTime } from "./date.utils";

describe("formatRelativeTime utility", () => {
    const originalNow = Date.now;
    const fixedNow = new Date("2026-09-03T20:00:00.000Z").getTime();

    beforeAll(() => {
        global.Date.now = jest.fn(() => fixedNow);
    });

    afterAll(() => {
        global.Date.now = originalNow;
    });

    it("returns empty string for null or undefined", () => {
        expect(formatRelativeTime(null)).toBe("");
        expect(formatRelativeTime(undefined)).toBe("");
    });

    it("returns raw string if not a parseable date", () => {
        expect(formatRelativeTime("2m ago")).toBe("2m ago");
    });

    it("formats just now / şimdi (< 1 minute)", () => {
        const date = new Date(fixedNow - 30 * 1000).toISOString();
        expect(formatRelativeTime(date, "tr")).toBe("şimdi");
        expect(formatRelativeTime(date, "en")).toBe("just now");
    });

    it("formats minutes ago (< 1 hour)", () => {
        const date = new Date(fixedNow - 5 * 60 * 1000).toISOString();
        expect(formatRelativeTime(date, "tr")).toBe("5 dk önce");
        expect(formatRelativeTime(date, "en")).toBe("5m ago");
    });

    it("formats hours ago (< 24 hours)", () => {
        const date = new Date(fixedNow - 3 * 60 * 60 * 1000).toISOString();
        expect(formatRelativeTime(date, "tr")).toBe("3 sa önce");
        expect(formatRelativeTime(date, "en")).toBe("3h ago");
    });

    it("formats days ago (< 7 days)", () => {
        const date = new Date(fixedNow - 2 * 24 * 60 * 60 * 1000).toISOString();
        expect(formatRelativeTime(date, "tr")).toBe("2 gün önce");
        expect(formatRelativeTime(date, "en")).toBe("2d ago");
    });
});
