import DynamicList from "../DynamicList";
import MovieCard from "../MovieCard";
import MusicCard from "../MusicCard";
import UserCard from "../UserCard";
import { StatDetailItemProps } from "./types";

export default function StatDetailItem(props: StatDetailItemProps) {
    switch (props.viewType) {
        case "dynamic-list":
            var { data, onSeeAllPress, onListItemPress, listTitle } = props;
            return (
                <DynamicList<any> /* ======================================================== */
                    data={data}
                    title={listTitle}
                    renderItem={({ item: movie }) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            poster={movie.poster}
                            interactions={movie.interactions}
                            onPress={() => onListItemPress?.(movie.id)}
                        />
                    )}
                    onSeeAllPress={onSeeAllPress}
                />
            );
        case "movie-card":
            var { data, onPress } = props;
            return (
                <MovieCard
                    title={data.title}
                    poster={data.poster}
                    interactions={{
                        rating: data.rating,
                        isLiked: data.isLiked,
                        hasReview: data.hasRevies,
                    }}
                    style={{ width: "31%" }}
                    onPress={onPress}
                />
            );
        case "music-card":
            var { data, cardType, onPress } = props;
            return (
                <MusicCard
                    type={cardType}
                    data={data}
                    onPress={onPress}
                    style={{ width: "31%" }}
                    hideCreator={props.hideCreator}
                />
            );
        case "user-card":
            var { data, currentUserId, onFollowPress, onCardPress } = props;
            return (
                <UserCard
                    user={data}
                    currentUserId={currentUserId}
                    onFollowPress={onFollowPress}
                    onCardPress={onCardPress}
                />
            );
        default:
            return <></>;
    }
}
