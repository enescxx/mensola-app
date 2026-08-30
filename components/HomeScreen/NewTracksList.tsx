import React from "react";
import DynamicList from "@/components/DynamicList";
import MusicCard from "@/components/MusicCard";
import { INewTracksListProps } from "./types";
import { listStyles } from "./styles";
import { NewTrack } from "@/services/home.service";

export default function NewTracksList({ tracks, onPress }: INewTracksListProps) {
    return (
        <DynamicList
            data={tracks}
            renderItem={({ item }: { item: NewTrack }) => (
                <MusicCard
                    type="track"
                    layout="vertical"
                    data={{
                        title: item.title,
                        image: item.albumCoverUrl,
                        artists: [{ name: item.artistName } as any],
                        spotifyId: item.spotifyId as any,
                        duration: 0,
                    } as any}
                    onPress={() => onPress(item)}
                />
            )}
            variant="horizontal"
            style={listStyles.list}
        />
    );
}
