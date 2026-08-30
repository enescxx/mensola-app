import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import BottomSheet from "@/components/BottomSheet";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { Colors } from "@/constants/colors";
import { MovieService } from "@/services/movie.service";
import { PlaylistService } from "@/services/playlist.service";
import { styles } from "./styles";

interface Props {
    isVisible: boolean;
    onClose: () => void;
    type: "movie-lists" | "playlists";
    onSuccess: () => void;
}

export default function CreateListBottomSheet({ isVisible, onClose, type, onSuccess }: Props) {
    const isMovie = type === "movie-lists";

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async () => {
        if (!title.trim()) {
            setError("Lütfen bir liste başlığı girin.");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            if (isMovie) {
                await MovieService.createList({
                    title: title.trim(),
                    description: description.trim() || undefined,
                    isPrivate,
                });
            } else {
                await PlaylistService.createPlaylist({
                    title: title.trim(),
                    description: description.trim() || undefined,
                    isPrivate,
                });
            }

            setTitle("");
            setDescription("");
            setIsPrivate(false);
            onSuccess();
            onClose();
        } catch (err: any) {
            const msg = err?.error?.message || err?.message || "Liste oluşturulurken bir hata oluştu.";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BottomSheet
            isVisible={isVisible}
            onClose={onClose}
            title={isMovie ? "Yeni Film Listesi Oluştur" : "Yeni Çalma Listesi Oluştur"}>
            <View style={styles.container}>
                <TextField
                    label="Liste Adı"
                    placeholder={isMovie ? "Örn. Favori Bilim Kurgu Filmlerim" : "Örn. Gece Yolculuğu Şarkıları"}
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                        if (error) setError(null);
                    }}
                />

                <TextField
                    label="Açıklama (İsteğe bağlı)"
                    placeholder="Listeniz hakkında kısa bir açıklama yazın..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={3}
                />

                <View style={styles.switchRow}>
                    <View style={styles.switchLabelGroup}>
                        <Text style={styles.switchLabel}>Gizli Liste</Text>
                        <Text style={styles.switchDesc}>
                            Gizli listeler sadece sizin profilinizde görünür.
                        </Text>
                    </View>
                    <Switch
                        value={isPrivate}
                        onValueChange={setIsPrivate}
                        trackColor={{ false: Colors.surface, true: Colors.primary }}
                        thumbColor="#FFFFFF"
                    />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <Button
                    label="Oluştur"
                    onPress={handleCreate}
                    disabled={isLoading}
                    style={styles.submitBtn}
                />
            </View>
        </BottomSheet>
    );
}
