import { BookmarkService } from "@/services/bookmark.service";
import { BookmarkTargetId, BookmarkTargetType } from "@/types/bookmark.types";
import { useCallback, useState } from "react";

interface UseBookmarkOptions<T> {
    targetId?: BookmarkTargetId;
    targetType?: BookmarkTargetType;
    targetDetails?: T;
    setTargetDetails?: (newIsSaved: boolean, newSavesCount?: number) => void;
}

export const useBookmark = <T extends { isSaved?: boolean; savesCount?: number }>({
    targetId,
    targetType,
    targetDetails,
    setTargetDetails,
}: UseBookmarkOptions<T>) => {
    const toggleSave = useCallback(async () => {
        if (!targetId || !targetDetails || !setTargetDetails || !targetType) return;

        const currentIsSaved = !!targetDetails.isSaved;
        const currentSavesCount = targetDetails.savesCount ?? 0;

        const newIsSaved = !currentIsSaved;
        const newSavesCount = newIsSaved ? currentSavesCount + 1 : Math.max(0, currentSavesCount - 1);

        setTargetDetails(newIsSaved, newSavesCount);

        try {
            const res = await BookmarkService.toggleBookmark({ targetId, targetType });
            const isSavedResult = res.data?.isSaved;
            if (typeof isSavedResult === "boolean") {
                setTargetDetails(isSavedResult, newSavesCount);
            }
        } catch (err) {
            setTargetDetails(currentIsSaved, currentSavesCount);
        }
    }, [targetId, targetType, targetDetails, setTargetDetails]);

    return { toggleSave };
};
