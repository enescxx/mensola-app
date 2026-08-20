import { UserId } from "@/types/common.types";
import { IUser } from "@/types/user.types";

export type FollowState = "FOLLOW" | "FOLLOW_BACK" | "FOLLOWING" | "SELF";
export interface IUserCardProps {
    user: Pick<IUser, "id" | "fullname" | "username" | "avatar"> & {
        isFollowing?: boolean;
        isFollower?: boolean;
    };
    currentUserId: UserId;
    onFollowPress?: (userId: UserId, isFollowing: boolean) => void;
    onCardPress?: (userId: UserId) => void;
}
