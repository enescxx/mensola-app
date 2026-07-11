type StatTypes = "movieNumber" | "playlistNumber" | "followers" | "following";

const StatLabels: Record<StatTypes, string> = {
    movieNumber: "Film",
    playlistNumber: "Playlist",
    followers: "Takipçi",
    following: "Takip"
};

interface StatData<T extends StatTypes> {
    type: T;
    value: string | number;
    label: (typeof StatLabels)[T];
}

interface Profile {
    id: string;
    username: string;
    fullname?: string;
    bio?: string;
    profilePictureUrl?: string;
    stats: [StatData<StatTypes>, StatData<StatTypes>, StatData<StatTypes>];
}

interface IProfileViewProps {
    userData: Profile;
    isOwnProfile: boolean;
}

interface IProfileHeaderProps {
    userData: Pick<
        Profile,
        "username" | "fullname" | "bio" | "profilePictureUrl" | "stats"
    >;
}

interface IProfileStatsProps {
    statsData: [StatData<StatTypes>, StatData<StatTypes>, StatData<StatTypes>];
}

interface IProfileStatItemProps {
    data: StatData<StatTypes>;
    onPress?: (type: StatTypes) => void;
}

export {
    StatTypes,
    IProfileViewProps,
    IProfileHeaderProps,
    IProfileStatsProps,
    IProfileStatItemProps
};
