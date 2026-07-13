import {
    StatTypes,
    IUserStatItem,
    IUser,
    IMovie,
    ITrack,
    IUserInteraction
} from "../../types";

const StatLabels: Record<StatTypes, string> = {
    followers: "Takipçi",
    following: "Takip",
    moviesWatched: "İzlendi",
    likedTracks: "Beğenilen Şarkılar",
    likedArtists: "Beğenilen Sanatçılar",
    likedMovies: "Beğenilen Filmler",
    moviesWatchlist: "İzleme Listesi",
    playlistsCount: "Oluşturulan Playlistler",
    movieLists: "Oluşturulan Film Listeleri"
};

interface IProfileViewPros {
    userData: IUser;
    isOwnProfile: boolean;
}

interface IProfileHeaderProps {
    userData: Pick<
        IUser,
        "username" | "fullname" | "bio" | "profilePicture" | "stats"
    >;
}

interface IHeaderStatsProps {
    stats: [IUserStatItem, IUserStatItem, IUserStatItem];
}

interface IHeaderStatItemProps {
    statData: IUserStatItem;
    onPress?: (type: StatType) => void;
}

interface IProfileBodyProps {
    interactions?: IUserInteraction[];
    favoriteMovies?: IMovie[];
    favoriteTracks?: ITrack[];
}

interface IProfileFooterProps {
    stats: IUserStatItem[];
}

interface IFooterItemProps {
    statData: IUserStatItem;
    onPress?: (type: StatType) => void;
}

export {
    StatLabels,
    IProfileViewPros,
    IProfileHeaderProps,
    IHeaderStatItemProps,
    IProfileBodyProps,
    IProfileFooterProps,
    IFooterItemProps
};
