import { useState, useCallback } from "react";
import { PlaylistService } from "@/services/playlist.service";

export interface IPlaylistItemOption {
    id: string;
    title: string;
    isChecked: boolean;
}

export const useUserPlaylists = (trackId?: string) => {
    const [playlists, setPlaylists] = useState<IPlaylistItemOption[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    const fetchUserPlaylists = useCallback(async () => {
        if (!trackId) return;

        setIsLoading(true);
        setError("");

        try {
            const response = await PlaylistService.getUserPlaylists(trackId);
            const rawLists = response?.data?.items || response?.data || [];

            const formattedLists: IPlaylistItemOption[] = rawLists.map((item: any) => ({
                id: item.id,
                title: item.title,
                isChecked: Boolean(item.containsTrack),
            }));

            setPlaylists(formattedLists);
        } catch (err: any) {
            setError("Playlistler yüklenirken bir hata oluştu.");
        } finally {
            setIsLoading(false);
        }
    }, [trackId]);

    const togglePlaylistSelection = async (playlistId: string) => {
        if (!trackId) return;

        const targetList = playlists.find((l) => l.id === playlistId);
        if (!targetList) return;

        const currentlyChecked = targetList.isChecked;
        const newChecked = !currentlyChecked;
        setActionLoadingId(playlistId);
        setError("");

        // Optimistic UI update
        const updatedLists = playlists.map((l) =>
            l.id === playlistId ? { ...l, isChecked: newChecked } : l
        );
        setPlaylists(updatedLists);

        try {
            if (currentlyChecked) {
                await PlaylistService.removeTrackFromPlaylist(playlistId, trackId);
            } else {
                await PlaylistService.addTrackToPlaylist(playlistId, trackId);
            }
        } catch (err: any) {
            // Revert optimistic update on error
            const revertedLists = playlists.map((l) =>
                l.id === playlistId ? { ...l, isChecked: currentlyChecked } : l
            );
            setPlaylists(revertedLists);

            if (err && err.success === false) {
                setError(err.error?.message || err?.message || "İşlem sırasında bir hata oluştu.");
            } else {
                setError("Sunucuya bağlanılamadı.");
            }
        } finally {
            setActionLoadingId(null);
        }
    };

    return {
        playlists,
        isLoading,
        actionLoadingId,
        error,
        fetchUserPlaylists,
        togglePlaylistSelection,
    };
};
