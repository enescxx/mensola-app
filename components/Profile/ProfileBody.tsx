import { IProfileBodyProps } from "./types";

import DynamicList from "../DynamicList";
import MovieCard from "../MovieCard";
import MusicCard from "../MusicCard";

export default function ProfileBody({
    interactions,
    favoriteMovies,
    favoriteTracks
}: IProfileBodyProps) {
    const seeAllFavoriteFilms = () => {};
    const seeAllFavoriteSongs = () => {};

    const getInteractions = movieId =>
        interactions?.find(
            i => i.targetId === movieId && i.targetType === "movie"
        );

    return (
        <>
            {favoriteMovies && favoriteMovies.length > 0 ? (
                <DynamicList
                    title="Favori Filmler"
                    data={favoriteMovies}
                    variant="horizontal"
                    onSeeAllPress={seeAllFavoriteFilms}
                    renderItem={({ item }) => {
                        return (
                            <MovieCard
                                title={item.title}
                                poster={item.poster}
                                interactions={getInteractions(item.id)}
                                variant="profile"
                            />
                        );
                    }}
                />
            ) : null}
            {favoriteTracks && favoriteTracks.length > 0 ? (
                <DynamicList
                    title="Favori Şarkılar"
                    data={favoriteTracks}
                    variant="horizontal"
                    onSeeAllPress={seeAllFavoriteSongs}
                    renderItem={({ item }) => (
                        <MusicCard
                            type="song"
                            title={item.title}
                            subtitle={item.artists
                                .map(artist => artist.name)
                                .join(", ")}
                            duration={item.duration}
                            variant="profile"
                        />
                    )}
                />
            ) : null}
        </>
    );
}
