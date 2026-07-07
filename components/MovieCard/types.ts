interface IMovieInteractions {
    rating?: string;
    likes: boolean | number;
    reviews: boolean | number;
}

interface IMovieCardFooterProps {
    interactions: IMovieInteractions;
    variant: "profile" | "feed";
}

interface IMovieCardProps {
    title: string;
    poster: string;
    interactions?: IMovieInteractions;
    variant?: "profile" | "feed";
}

export { IMovieCardFooterProps, IMovieCardProps };
