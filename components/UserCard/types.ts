import { UserId } from "@/types/common.types";
import { IUser } from "@/types/user.types";

export type FollowState = "FOLLOW" | "FOLLOW_BACK" | "FOLLOWING" | "REQUESTED" | "SELF";
export interface IUserCardProps {
    user: Pick<IUser, "id" | "fullname" | "username" | "avatar"> & {
        isFollowing?: boolean;
        isFollower?: boolean;
        isPending?: boolean;
    };
    currentUserId: UserId;
    onFollowPress?: (userId: UserId, isFollowing: boolean, isPending?: boolean) => void;
    onCardPress?: (userId: UserId) => void;
    isFirst?: boolean;
    isLast?: boolean;
}
