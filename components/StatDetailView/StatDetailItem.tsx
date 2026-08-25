import { StatDetailsItemMap, StatType } from "@/types/stat.types";
import DynamicList from "../DynamicList";
import MovieCard from "../MovieCard";
import MusicCard from "../MusicCard";
import UserCard from "../UserCard";
import { StatDetailItemProps } from "./types";
import { GetListsResponseDataItem } from "@/types/movie.types";

export default function StatDetailItem<T extends StatType = StatType>(props: StatDetailItemProps<T>) {
    switch (props.viewType) {
        case "dynamic-list": {
            const { data, onSeeAllPress, onListItemPress, listTitle } = props;
            return (
                <DynamicList
                    data={data}
                    title={listTitle}
                    renderItem={({ item: movie }) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            poster={movie.poster}
                            interactions={{
                                rating: movie?.rating,
                                isLiked: movie.isLiked,
                                hasReview: movie.hasReview,
                            }}
                            onPress={() => onListItemPress?.(movie.id)}
                        />
                    )}
                    onSeeAllPress={onSeeAllPress}
                />
            );
        }
        case "movie-card": {
            const { data, onPress } = props;
            return (
                <MovieCard
                    title={data.title}
                    poster={data.poster}
                    interactions={{
                        rating: data?.rating,
                        isLiked: data.isLiked,
                        hasReview: data.hasReview,
                    }}
                    style={{ width: "31%" }}
                    onPress={onPress}
                />
            );
        }
        case "music-card": {
            if (props.cardType === "track") {
                return (
                    <MusicCard
                        type="track"
                        data={props.data}
                        onPress={props.onPress}
                        style={{ width: "31%" }}
                    />
                );
            } else if (props.cardType === "album") {
                return (
                    <MusicCard
                        type="album"
                        data={props.data}
                        onPress={props.onPress}
                        style={{ width: "31%" }}
                    />
                );
            } else if (props.cardType === "playlist") {
                return (
                    <MusicCard
                        type="playlist"
                        data={props.data}
                        onPress={props.onPress}
                        style={{ width: "31%" }}
                        hideCreator={props.hideCreator}
                    />
                );
            }
            return <></>;
        }
        case "user-card": {
            var { data, currentUserId, onFollowPress, onCardPress, isFirst, isLast } = props;
            return (
                <UserCard
                    user={data}
                    currentUserId={currentUserId}
                    onFollowPress={onFollowPress}
                    onCardPress={onCardPress}
                    isFirst={isFirst}
                    isLast={isLast}
                />
            );
        }
        default:
            return <></>;
    }
}
