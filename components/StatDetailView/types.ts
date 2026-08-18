export type StatTypes =
    | "movie-lists"
    | "playlists"
    | "watchlist"
    | "watched"
    | "liked-movies"
    | "liked-tracks"
    | "liked-playlists"
    | "liked-movie-lists"
    | "liked-albums"
    | "followers"
    | "following"
    | "favorite-movies"
    | "favorites-tracks";
export type StatDetailProps = {
    currentUserId?: string;
    statType: string; //StatTypes;
    items?: any; /* ================================================== */
    loadMore?: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    isLoading?: boolean;
    isRefetching?: boolean;
    isError?: boolean;
    refetch?: () => void;
    isOwnProfile?: boolean;
};
export type ViewTypes = "dynamic-list" | "music-card" | "movie-card" | "user-card";
export type StatDetailItemProps = { viewType?: ViewTypes } & (
    | {
          viewType?: "dynamic-list";
          data: any; /* ================================================== */
          listTitle?: string;
          onSeeAllPress?: () => void;
          onListItemPress?: (movieId: string) => void;
      }
    | {
          viewType?: "music-card";
          cardType: "track" | "album" | "playlist";
          data: any; /* ================================================== */
          hideCreator?: boolean;
          onPress?: () => void;
      }
    | {
          viewType?: "movie-card";
          data: any; /* ================================================== */
          onPress?: () => void;
      }
    | {
          viewType?: "user-card";
          data: any; /* ================================================== */
          currentUserId: string;
          onCardPress?: (userId: string) => void;
          onFollowPress?: (userId: string, isFollowing: boolean) => void;
      }
);
