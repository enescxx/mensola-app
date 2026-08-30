import { HeroMovie, NowPlayingMovie, NewTrack } from "@/services/home.service";

export interface IHeroCarouselProps {
    movies: HeroMovie[];
    onMoviePress: (movie: HeroMovie) => void;
}

export interface INowPlayingListProps {
    movies: NowPlayingMovie[];
    onPress: (movie: NowPlayingMovie) => void;
}

export interface INewTracksListProps {
    tracks: NewTrack[];
    onPress: (track: NewTrack) => void;
}

export interface ISectionHeaderProps {
    title: string;
    onSeeAll?: () => void;
    seeAllLabel?: string;
}

export interface IHomeHeaderProps {
    onNotificationPress?: () => void;
}
