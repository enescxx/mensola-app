export type CommentTargetType =
    | "movie"
    | "tv"
    | "song"
    | "album"
    | "playlist"
    | "movieList"
    | "comment";

interface IComment {
    id: string;
    userId: string;
    username: string;
    userAvatarUrl?: string;
    targetId: string;
    targetType: CommentTargetType;
    parentId?: string;
    content: string;
    rating?: number;
    likesCount: number;
    repliesCount: number;
    createdAt: string;
}

export { IComment, CommentTargetType };
