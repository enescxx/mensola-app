import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import BottomSheet from "@/components/BottomSheet";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { Colors } from "@/constants/colors";
import { MovieService } from "@/services/movie.service";
import { PlaylistService } from "@/services/playlist.service";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";

interface Props {
    isVisible: boolean;
    onClose: () => void;
    type: "movie-lists" | "playlists";
    onSuccess: () => void;
}

export default function CreateListBottomSheet({ isVisible, onClose, type, onSuccess }: Props) {
    const { t } = useTranslation();
    const isMovie = type === "movie-lists";

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async () => {
        if (!title.trim()) {
            setError(t("lists.create.errorTitleRequired"));
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
            const msg = err?.error?.message || err?.message || t("lists.create.errorGeneral");
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BottomSheet
            isVisible={isVisible}
            onClose={onClose}
            title={isMovie ? t("lists.create.titleMovie") : t("lists.create.titleTrack")}>
            <View style={styles.container}>
                <TextField
                    label={t("lists.create.nameLabel")}
                    placeholder={isMovie ? t("lists.create.namePlaceholderMovie") : t("lists.create.namePlaceholderTrack")}
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                        if (error) setError(null);
                    }}
                />

                <TextField
                    label={t("lists.create.descriptionLabel")}
                    placeholder={t("lists.create.descriptionPlaceholder")}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={3}
                />

                <View style={styles.switchRow}>
                    <View style={styles.switchLabelGroup}>
                        <Text style={styles.switchLabel}>{t("lists.create.privateLabel")}</Text>
                        <Text style={styles.switchDesc}>
                            {t("lists.create.privateListDesc")}
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
                    label={t("lists.create.submitButton")}
                    onPress={handleCreate}
                    disabled={isLoading}
                    style={styles.submitBtn}
                />
            </View>
        </BottomSheet>
    );
}
