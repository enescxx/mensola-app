import { StatTypes, IUserStatItem, IUser, IMovie, ITrack } from "../../types";

const StatLabels: Record<StatTypes, string> = {
    movieListCount: "Oluşturulan Film Listeleri",
    playlistCount: "Oluşturulan Playlistler",
    watchlistMoviesCount: "İzleme Listesi",
    watchedMoviesCount: "İzlendi",
    likedMoviesCount: "Beğenilen Filmler",
    likedTracksCount: "Beğenilen Şarkılar",
    likedPlaylistsCount: "Beğenilen Playlistler",
    likedMovieListsCount: "Beğenilen Film Listeleri",
    likedAlbumsCount: "Beğenilen Albümler",
    followerCount: "Takipçi",
    followingCount: "Takip"
};

interface IHeaderStatsProps {
    stats: [IUserStatItem, IUserStatItem, IUserStatItem];
    onStatPress?: (type: StatTypes) => void;
}

interface IHeaderStatItemProps {
    statData: IUserStatItem;
    onPress?: (type: StatTypes) => void;
}

interface IFooterItemProps {
    statData: IUserStatItem;
    onPress?: (type: StatTypes) => void;
}

export {
    StatLabels,
    IHeaderStatsProps,
    IHeaderStatItemProps,
    IFooterItemProps
};
