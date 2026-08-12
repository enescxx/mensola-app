import { ITrack, IAlbum, IPlaylist } from "../../types";
import { StyleProp, ViewStyle } from "react-native";

type MusicCardType = "song" | "album" | "playlist";

type IMusicCardProps =
    | {
          type: "track";
          data: Pick<ITrack, "title" | "image" | "artists" | "duration">;
          onPress?: () => void;
          style?: StyleProp<ViewStyle>;
      }
    | {
          type: "album";
          data: Pick<IAlbum, "title" | "image" | "artists" | "releaseYear">;
          onPress?: () => void;
          style?: StyleProp<ViewStyle>;
      }
    | {
          type: "playlist";
          data: Pick<IPlaylist, "title" | "image" | "creator" | "songCount">;
          onPress?: () => void;
          style?: StyleProp<ViewStyle>;
          hideCreator?: boolean;
      };

export { IMusicCardProps };
