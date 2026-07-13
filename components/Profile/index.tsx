import { ScrollView } from "react-native";

import { styles } from "./styles";
import { IProfileViewProps } from "./types";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileFooter from "./ProfileFooter";

export default function ProfileView({
    userData,
    isOwnProfile = false
}: IProfileViewProps) {
    const {
        interactions,
        favoriteMovies,
        favoriteTracks,
        stats,
        ...headerData
    } = userData;

    const activeHeaderStats = ["moviesWatched", "followers", "following"];
    const headerStats =
        stats?.filter(s => activeHeaderStats.includes(s.type)) || [];

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <ProfileHeader
                userData={{
                    ...headerData,
                    stats: headerStats
                }}
            />
            <ProfileBody
                interactions={interactions}
                favoriteMovies={favoriteMovies}
                favoriteTracks={favoriteTracks}
            />
            <ProfileFooter stats={stats} />
        </ScrollView>
    );
}
