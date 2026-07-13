import {
    IUser,
    IMovie,
    ITrack,
    IUserStatItem,
    IUserInteraction,
    IComment
} from "../types";

const FAVORITE_MOVIES: IMovies[] = [
    {
        id: "movie-1",
        title: "Movie 1",
        poster: "https://example.com/poster1.jpg"
    },
    {
        id: "movie-2",
        title: "Movie 2",
        poster: "https://example.com/poster2.jpg"
    },
    {
        id: "movie-3",
        title: "Movie 3",
        poster: "https://example.com/poster3.jpg"
    }
];

const FAVORITE_TRACKS: ITrack[] = [
    {
        id: "track-1",
        title: "Track 1",
        duration: 267,
        artists: [
            {
                id: "artist-1",
                name: "Artist 1"
            }
        ]
    },
    {
        id: "track-2",
        title: "Track 2",
        duration: 267,
        artists: [
            {
                id: "artist-2",
                name: "Artist 2"
            }
        ]
    },
    {
        id: "track-3",
        title: "Track 3",
        duration: 267,
        artists: [
            {
                id: "artist-3",
                name: "Artist 3"
            }
        ]
    }
];

const USER_STATS: IUserStatItem[] = [
    { type: "followers", value: 47 },
    { type: "following", value: 53 },
    { type: "moviesWatched", value: 147 },
    { type: "likedTracks", value: 247 },
    { type: "likedArtists", value: 13 },
    { type: "likedMovies", value: 317 },
    { type: "moviesWatchlist", value: 957 },
    { type: "playlistsCount", value: 8 },
    { type: "movieLists", value: 7 }
];

const USER_INTERACTIONS: IUserInteraction[] = [
    {
        id: "interaction-1",
        userId: "user-1",
        targetId: "movie-1",
        targetType: "movie",
        isLiked: true,
        rating: 4
    },
    {
        id: "interaction-2",
        userId: "user-1",
        targetId: "movie-2",
        targetType: "movie",
        isLiked: false,
        rating: 4.5
    },
    {
        id: "interaction-1",
        userId: "user-1",
        targetId: "movie-3",
        targetType: "movie",
        isLiked: true,
        rating: 5
    }
];

const MOCK_USER: IUser = {
    id: "user-1",
    username: "enescxx",
    fullname: "Enes Can",
    profilePicture: "https://example.com/profile.jpg",
    bio: "a mensola user",
    stats: USER_STATS,
    favoriteMovies: FAVORITE_MOVIES,
    favoriteTracks: FAVORITE_TRACKS,
    interactions: USER_INTERACTIONS
};

export { MOCK_USER };
