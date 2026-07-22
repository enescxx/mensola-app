import DynamicList from "../DynamicList";
import MovieCard from "../MovieCard";
import MusicCard from "../MusicCard";

import { useProfileContext } from "../../context/ProfileContext";

export default function ProfileBody() {
    const { bodyData, handleSeeAllPress } = useProfileContext();
    const { favoriteMovies, favoriteTracks } = bodyData;

    const getInteractions = movie => {
        return {
            rating: movie.rating,
            isLiked: movie.isLiked,
            hasReview: movie.hasReview
        };
    };

    return (
        <>
            {favoriteMovies && favoriteMovies.length > 0 ? (
                <DynamicList
                    title="Favori Filmler"
                    data={favoriteMovies}
                    variant="horizontal"
                    onSeeAllPress={() => handleSeeAllPress("movies")}
                    renderItem={({ item }) => {
                        return (
                            <MovieCard
                                title={item.title}
                                poster={item.poster}
                                interactions={getInteractions(item)}
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
                    onSeeAllPress={() => handleSeeAllPress("tracks")}
                    renderItem={({ item }) => (
                        <MusicCard type="song" data={item} />
                    )}
                />
            ) : null}
        </>
    );
}
