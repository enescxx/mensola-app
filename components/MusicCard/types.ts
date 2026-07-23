import { ITrack, IAlbum, IPlaylist } from "../../types";
import { StyleProp, TouchableOpacityStyle } from "react-native";

type MusicCardType = "song" | "album" | "playlist";

export type IMusicCardProps =
    | {
          type: "song";
          data: Pick<ITrack, "title" | "image" | "artists" | "duration">;
          onPress?: () => void;
          style?: StyleProp<TouchableOpacityStyle>;
      }
    | {
          type: "album";
          data: Pick<IAlbum, "title" | "image" | "artists" | "releaseYear">;
          onPress?: () => void;
          style?: StyleProp<TouchableOpacityStyle>;
      }
    | {
          type: "playlist";
          data: Pick<IPlaylist, "title" | "image" | "creator" | "songCount">;
          onPress?: () => void;
          style?: StyleProp<TouchableOpacityStyle>;
      };

export { IMusicCardProps };
