interface IArtistCardProps {
    name: string;
    avatarUrl: string;
    followers?: string;
    onPress?: () => void;
}

export { IArtistCardProps };
