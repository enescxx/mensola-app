import { IArtist } from "../../types";

interface IArtistCardProps {
    artist: Pick<IArtist, "name" | "image" | "followers">;
    onPress?: () => void;
}

export { IArtistCardProps };
