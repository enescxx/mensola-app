import { IUser } from "../../types";

type FollowState = "FOLLOW" | "FOLLOW_BACK" | "FOLLOWING" | "SELF";

interface IUserCardProps {
    user: Pick<IUser, "id" | "fullname" | "username" | "avatar"> & {
        isFollowing?: boolean;
        isFollower?: boolean;
    };
    currentUserId: string;
    onFollowPress?: (userId: string, isFollowing: boolean) => void;
    onCardPress?: (userId: string) => void;
}

export { FollowState, IUserCardProps };
