import { useState, useCallback, useEffect } from "react";
import { router } from "expo-router";

import { UserService } from "@/services/user.service";
import { useGlobalUser } from "@/context/AuthContext";
import { useDebounce } from "@/hooks/shared/useDebounce";
import { UsernameStatus } from "@/components/Settings/ChangeUsername/types";

// Mirrors the API validation rule
const USERNAME_REGEX = /^[a-z0-9_.]{3,20}$/;

interface UseChangeUsernameOptions {
    currentUsername: string;
    onSuccess?: (newUsername: string) => void;
}

export function useChangeUsername({ currentUsername, onSuccess }: UseChangeUsernameOptions) {
    const { user, setUser } = useGlobalUser();

    const [value, setValue] = useState("");
    const [status, setStatus] = useState<UsernameStatus>("idle");
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // The handle shown in the live preview — falls back to current if empty
    const previewHandle = value.trim() || currentUsername;

    // Debounce the raw input value before firing the availability check
    const debouncedValue = useDebounce(value, 500);

    // ── Async availability check (fires when debounced value settles) ─────────
    const checkAvailability = useCallback(
        async (username: string) => {
            if (!username) {
                setStatus("idle");
                return;
            }
            if (!USERNAME_REGEX.test(username)) {
                setStatus("invalid");
                return;
            }
            // Skip server round-trip if it's the same as the current username
            if (username === currentUsername) {
                setStatus("idle");
                return;
            }
            setStatus("checking");
            try {
                const res = await UserService.checkUsername(username);
                setStatus(res.data?.available ? "available" : "taken");
            } catch {
                setStatus("idle");
            }
        },
        [currentUsername],
    );

    useEffect(() => {
        checkAvailability(debouncedValue);
    }, [debouncedValue, checkAvailability]);

    // ── Input handler ─────────────────────────────────────────────────────────
    const handleChange = (text: string) => {
        // Force lowercase, strip invalid characters on the fly
        const cleaned = text.toLowerCase().replace(/[^a-z0-9_.]/g, "");
        setValue(cleaned);
        setErrorMessage(null);
        // Show spinner immediately rather than waiting for debounce
        if (cleaned && cleaned !== currentUsername) {
            setStatus("checking");
        } else {
            setStatus("idle");
        }
    };

    // ── Save ──────────────────────────────────────────────────────────────────
    const handleSave = async () => {
        if (status !== "available" || isSaving) return;
        setIsSaving(true);
        setErrorMessage(null);
        try {
            const res = await UserService.changeUsername(value.trim());
            const newUsername = res.data?.user?.username;
            if (user && newUsername) {
                setUser({ ...user, username: newUsername });
            }
            if (newUsername) onSuccess?.(newUsername);
            router.back();
        } catch (err: any) {
            const message =
                err?.message ||
                err?.error?.message ||
                "Kullanıcı adı değiştirilemedi. Lütfen tekrar deneyin.";
            setErrorMessage(message);
        } finally {
            setIsSaving(false);
        }
    };

    const canSave = status === "available" && !isSaving;

    return {
        value,
        status,
        isSaving,
        errorMessage,
        previewHandle,
        canSave,
        handleChange,
        handleSave,
    };
}
