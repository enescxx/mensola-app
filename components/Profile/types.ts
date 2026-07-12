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

interface IFavoriteMovie {
    id: string;
    title: string;
    posterUrl: string;
    year: number;
}

interface IFavoriteSong {
    id: string;
    title: string;
    artist: string;
    duration: string;
}

interface Profile {
    id: string;
    username: string;
    fullname?: string;
    bio?: string;
    profilePictureUrl?: string;
    stats: [StatData<StatTypes>, StatData<StatTypes>, StatData<StatTypes>];
    favoriteFilms?: IFavoriteMovie[];
    favoriteSongs?: IFavoriteSong[];
}

type FooterItemTypes =
    | "songLikes"
    | "artistLikes"
    | "movieLikes"
    | "watchlist"
    | "musicPlaylists"
    | "movieLists";

const FooterItemLabels: Record<FooterItemTypes, string> = {
    songLikes: "Beğenilen Şarkılar",
    artistLikes: "Beğenilen Sanatçılar",
    movieLikes: "Beğenilen Filmler",
    watchlist: "İzleme Listesi",
    musicPlaylists: "Oluşturulan Playlistler",
    movieLists: "Oluşturulan Film Listeleri"
};

interface IFooterItemProps {
    type: FooterItemTypes;
    value: number;
    onPress: (type: FooterItemTypes) => void;
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

interface IProfileBodyProps {
    favoriteMovies?: IFavoriteMovie[];
    favoriteSongs?: IFavoriteSong[];
}

export {
    StatTypes,
    FooterItemLabels,
    IProfileViewProps,
    IProfileHeaderProps,
    IProfileStatsProps,
    IProfileStatItemProps,
    IProfileBodyProps,
    IFooterItemProps
};
