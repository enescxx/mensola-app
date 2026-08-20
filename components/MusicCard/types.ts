import { IAlbum } from "@/types/album.types";
import { IPlaylist } from "@/types/playlist.types";
import { ITrack } from "@/types/track.types";
import { StyleProp, ViewStyle } from "react-native";

type IMusicCardProps<
    TTrack extends ITrack = ITrack,
    TAlbum extends IAlbum = IAlbum,
    TPlaylist extends IPlaylist = IPlaylist,
> =
    | {
          type: "track";
          data: TTrack;
          onPress?: () => void;
          style?: StyleProp<ViewStyle>;
      }
    | {
          type: "album";
          data: TAlbum;
          onPress?: () => void;
          style?: StyleProp<ViewStyle>;
      }
    | {
          type: "playlist";
          data: TPlaylist;
          onPress?: () => void;
          style?: StyleProp<ViewStyle>;
          hideCreator?: boolean;
      };

export { IMusicCardProps };
