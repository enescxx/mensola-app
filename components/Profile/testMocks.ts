import { IUser } from "../../types";

export const mockStats = [
    { type: "followers", value: 150 },
    { type: "following", value: 100 },
    { type: "moviesWatched", value: 45 },
    { type: "likedMovies", value: 12 }
];

export const mockUserData: any = {
    username: "johndoe",
    fullname: "John Doe",
    bio: "Test Bio",
    profilePicture: "https://example.com/avatar.png",
    stats: mockStats,
    favoriteMovies: [{ id: "m1", title: "Movie Name", poster: "url" }],
    favoriteTracks: [{ id: "t1", title: "Track Name", artist: "Artist Name" }],
    interactions: [{ targetId: "m1", targetType: "movie", rating: 5 }]
};
