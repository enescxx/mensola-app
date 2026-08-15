import { Share } from "react-native";

export interface IShareContentOptions {
    title?: string;
    message?: string;
    url?: string;
}

export interface IShareMovieListOptions {
    id: string;
    title: string;
}

export interface ISharePlaylistOptions {
    id: string;
    title: string;
}

export interface IShareMovieOptions {
    id: string;
    title: string;
}

export interface IShareUserOptions {
    id: string;
    username: string;
}

/**
 * Generic content share utility using native device share sheet.
 */
export const shareContent = async (options: IShareContentOptions): Promise<boolean> => {
    try {
        const result = await Share.share({
            title: options.title,
            message: options.message || "",
            url: options.url,
        });
        return result.action === Share.sharedAction;
    } catch (error) {
        console.error("Share error:", error);
        return false;
    }
};

/**
 * Shares a Movie List with formatted title and web link.
 */
export const shareMovieList = async (list: IShareMovieListOptions): Promise<boolean> => {
    const shareUrl = `https://mensola.app/movie-lists/${list.id}`;
    return shareContent({
        title: list.title,
        message: `"${list.title}" film listesine Mensola'da göz atın!\n${shareUrl}`,
        url: shareUrl,
    });
};

/**
 * Shares a Playlist with formatted title and web link.
 */
export const sharePlaylist = async (list: ISharePlaylistOptions): Promise<boolean> => {
    const shareUrl = `https://mensola.app/playlists/${list.id}`;
    return shareContent({
        title: list.title,
        message: `"${list.title}" oynatma listesine Mensola'da göz atın!\n${shareUrl}`,
        url: shareUrl,
    });
};

/**
 * Shares a Movie with formatted title and web link.
 */
export const shareMovie = async (movie: IShareMovieOptions): Promise<boolean> => {
    const shareUrl = `https://mensola.app/movies/${movie.id}`;
    return shareContent({
        title: movie.title,
        message: `"${movie.title}" filmine Mensola'da göz atın!\n${shareUrl}`,
        url: shareUrl,
    });
};

/**
 * Shares a User Profile with formatted username and web link.
 */
export const shareUserProfile = async (user: IShareUserOptions): Promise<boolean> => {
    const shareUrl = `https://mensola.app/users/${user.username}`;
    return shareContent({
        title: `@${user.username}`,
        message: `@${user.username} profilini Mensola'da inceleyin!\n${shareUrl}`,
        url: shareUrl,
    });
};

/**
 * Reusable React Hook wrapper for sharing content.
 */
export const useShare = () => {
    return {
        shareContent,
        shareMovieList,
        shareMovie,
        shareUserProfile,
    };
};
