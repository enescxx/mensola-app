type MusicCardType = "song" | "album" | "playlist";

interface IMusicCardProps {
    type: MusicCardType;
    title: string; // Şarkı, Albüm veya Playlist adı
    subtitle: string; // Sanatçı adı veya Oluşturan kişi
    coverImage: string; // Kare kapak resmi
    duration?: string; // Şarkı için (Örn: "3:45")
    releaseYear?: number; // Albüm için (Örn: 2026)
    songCount?: number; // Playlist için (Örn: 42)
    onPress?: () => void;
}

export { IMusicCardProps };
