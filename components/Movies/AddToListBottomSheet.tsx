import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import BottomSheet from "@/components/BottomSheet";
import { useMovieLists } from "@/hooks/movie/useMovieLists";
import AddToListSheetItem from "./AddToListSheetItem";
import { styles } from "./styles";
import { IAddToListBottomSheetProps } from "./types";

export default function AddToListBottomSheet({
    isVisible,
    onClose,
    movieId,
    isWatchlisted,
    onStatusChange,
}: IAddToListBottomSheetProps) {
    const {
        lists,
        isLoading,
        actionLoadingId,
        error,
        fetchUserLists,
        toggleListSelection,
    } = useMovieLists(movieId, isWatchlisted);

    useEffect(() => {
        if (isVisible && movieId) {
            fetchUserLists();
        }
    }, [isVisible, movieId, fetchUserLists]);

    return (
        <BottomSheet
            isVisible={isVisible}
            onClose={onClose}
            title="Listelerime Ekle"
            showCloseButton
        >
            <View style={styles.listContainer}>
                {error ? <Text style={styles.sheetError}>{error}</Text> : null}

                {isLoading ? (
                    <ActivityIndicator size="large" color="#1DB954" style={{ paddingVertical: 24 }} />
                ) : (
                    <FlatList
                        data={lists}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <AddToListSheetItem
                                item={item}
                                onToggle={toggleListSelection}
                                isLoading={actionLoadingId === item.id}
                                onStatusChange={onStatusChange}
                            />
                        )}
                        scrollEnabled={false}
                    />
                )}
            </View>
        </BottomSheet>
    );
}
