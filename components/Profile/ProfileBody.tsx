import { IProfileBodyProps } from "./types";

import DynamicList from "../DynamicList";
import MovieCard from "../MovieCard";
import MusicCard from "../MusicCard";

export default function ProfileBody({
    favoriteMovies,
    favoriteSongs
}: IProfileBodyProps) {
    const seeAllFavoriteFilms = () => {};
    const seeAllFavoriteSongs = () => {};

    return (
        <>
            <DynamicList
                title="Favori Filmler"
                data={favoriteMovies}
                variant="horizontal"
                onSeeAllPress={seeAllFavoriteFilms}
                renderItem={({ item }) => (
                    <MovieCard
                        title={item.title}
                        poster={item.poster}
                        interactions={item.interactions}
                        variant="profile"
                    />
                )}
            />
            <DynamicList
                title="Favori Şarkılar"
                data={favoriteSongs}
                variant="horizontal"
                onSeeAllPress={seeAllFavoriteSongs}
                renderItem={({ item }) => (
                    <MusicCard
                        type="song"
                        title={item.title}
                        subtitle={item.artist}
                        duration={item.duration}
                        variant="profile"
                    />
                )}
            />
        </>
    );
}
