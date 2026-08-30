import React from "react";
import DynamicList from "@/components/DynamicList";
import MovieCard from "@/components/MovieCard";
import { NowPlayingMovie } from "@/services/home.service";
import { INowPlayingListProps } from "./types";
import { listStyles } from "./styles";

export default function NowPlayingList({ movies, onPress }: INowPlayingListProps) {
    return (
        <DynamicList
            data={movies}
            renderItem={({ item }: { item: NowPlayingMovie }) => (
                <MovieCard
                    title={item.title}
                    poster={item.posterUrl}
                    releaseDate={item.releaseDate}
                    ratingAverage={item.rating}
                    layout="vertical"
                    onPress={() => onPress(item)}
                />
            )}
            variant="horizontal"
            style={listStyles.list}
        />
    );
}
