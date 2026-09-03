/**
 * Formats an ISO date string or Date object into human-friendly relative time.
 * Supports Turkish ('tr') and English ('en') formatting.
 * Gracefully preserves pre-formatted strings (e.g. "2m ago") if unparseable.
 */
export const formatRelativeTime = (
    dateInput: string | Date | null | undefined,
    currentLocale: string = "tr"
): string => {
    if (!dateInput) return "";

    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    // If not a valid date, return raw string
    if (Number.isNaN(date.getTime())) {
        return String(dateInput);
    }

    const now = Date.now();
    const diffMs = now - date.getTime();
    const isTurkish = currentLocale?.toLowerCase().startsWith("tr");

    // Clock skew or future date (within a minute)
    if (diffMs < 60 * 1000) {
        return isTurkish ? "şimdi" : "just now";
    }

    const diffMinutes = Math.floor(diffMs / (60 * 1000));
    if (diffMinutes < 60) {
        return isTurkish ? `${diffMinutes} dk önce` : `${diffMinutes}m ago`;
    }

    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    if (diffHours < 24) {
        return isTurkish ? `${diffHours} sa önce` : `${diffHours}h ago`;
    }

    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    if (diffDays < 7) {
        return isTurkish ? `${diffDays} gün önce` : `${diffDays}d ago`;
    }

    // Older than a week: format date
    const currentYear = new Date(now).getFullYear();
    const targetYear = date.getFullYear();

    try {
        const localeCode = isTurkish ? "tr-TR" : "en-US";
        if (currentYear === targetYear) {
            return date.toLocaleDateString(localeCode, {
                day: "numeric",
                month: "short",
            });
        }
        return date.toLocaleDateString(localeCode, {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    } catch {
        return date.toLocaleDateString();
    }
};
