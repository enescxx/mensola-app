import { ITrack, IAlbum, IPlaylist } from "../../types";

type MusicCardType = "song" | "album" | "playlist";

export type IMusicCardProps =
    | {
          type: "song";
          data: Pick<ITrack, "title" | "image" | "artists" | "duration">;
          onPress?: () => void;
      }
    | {
          type: "album";
          data: Pick<IAlbum, "title" | "image" | "artists" | "releaseYear">;
          onPress?: () => void;
      }
    | {
          type: "playlist";
          data: Pick<IPlaylist, "title" | "image" | "creator" | "songCount">;
          onPress?: () => void;
      };

export { IMusicCardProps };
