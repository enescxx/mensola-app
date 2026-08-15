import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from "react-native";

import BottomSheet from "@/components/BottomSheet";
import { useUserPlaylists } from "@/hooks/music/useUserPlaylists";
import AddToPlaylistSheetItem from "./AddToPlaylistSheetItem";

interface AddToPlaylistBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    trackId?: string;
}

export default function AddToPlaylistBottomSheet({
    isVisible,
    onClose,
    trackId,
}: AddToPlaylistBottomSheetProps) {
    const {
        playlists,
        isLoading,
        actionLoadingId,
        error,
        fetchUserPlaylists,
        togglePlaylistSelection,
    } = useUserPlaylists(trackId);

    useEffect(() => {
        if (isVisible && trackId) {
            fetchUserPlaylists();
        }
    }, [isVisible, trackId, fetchUserPlaylists]);

    return (
        <BottomSheet
            isVisible={isVisible}
            onClose={onClose}
            title="Playlistlerime Ekle"
            showCloseButton
        >
            <View style={styles.listContainer}>
                {error ? <Text style={styles.sheetError}>{error}</Text> : null}

                {isLoading ? (
                    <ActivityIndicator size="large" color="#1DB954" style={{ paddingVertical: 24 }} />
                ) : playlists.length === 0 ? (
                    <Text style={styles.emptyText}>Henüz playlistiniz bulunmuyor.</Text>
                ) : (
                    <FlatList
                        data={playlists}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <AddToPlaylistSheetItem
                                item={item}
                                onToggle={togglePlaylistSelection}
                                isLoading={actionLoadingId === item.id}
                            />
                        )}
                        scrollEnabled={false}
                    />
                )}
            </View>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 8,
    },
    sheetError: {
        color: "#FF3B30",
        fontSize: 14,
        marginBottom: 8,
        textAlign: "center",
    },
    emptyText: {
        color: "#8C8C8C",
        fontSize: 15,
        paddingVertical: 24,
        textAlign: "center",
    },
});
