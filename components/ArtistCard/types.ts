import { IArtist } from "@/types/artist.types";

export interface IArtistCardProps {
    artist: IArtist;
    onPress?: () => void;
}
