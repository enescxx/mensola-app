import { View } from "react-native";

import { styles } from "./styles";
import FooterItem from "./ProfileFooterItem";

import { useProfileContext } from "../../context/ProfileContext";
import { StatTypeKey } from "@/types/stat.types";
import { ListGroup } from "../ListGroup";

const MOVIE_KEYS: StatTypeKey[] = [
    "watchedMoviesCount",
    "watchlistMoviesCount",
    "likedMoviesCount",
    "movieListCount",
    "likedMovieListsCount",
];

const MUSIC_KEYS: StatTypeKey[] = [
    "likedTracksCount",
    "likedAlbumsCount",
    "playlistCount",
    "likedPlaylistsCount",
];

const SOCIAL_KEYS: StatTypeKey[] = ["followersCount", "followingCount"];

export default function ProfileFooter() {
    const { footerData, handleStatPress } = useProfileContext();
    const { stats } = footerData;

    const renderGroup = (keys: StatTypeKey[], title: string) => {
        const availableStats = keys.filter((key) => stats[key] !== undefined);
        if (availableStats.length === 0) return null;

        return (
            <ListGroup title={title} key={title}>
                {availableStats.map((key, index) => (
                    <FooterItem
                        key={key}
                        statType={key}
                        statValue={stats[key]!}
                        onPress={handleStatPress}
                        isFirst={index === 0}
                        isLast={index === availableStats.length - 1}
                    />
                ))}
            </ListGroup>
        );
    };

    return (
        <View style={styles.profileFooter}>
            {renderGroup(MOVIE_KEYS, "Film & Dizi")}
            {renderGroup(MUSIC_KEYS, "Müzik")}
            {renderGroup(SOCIAL_KEYS, "Sosyal")}
        </View>
    );
}

