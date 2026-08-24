import { UserId } from "@/types/common.types";
import { IUser } from "@/types/user.types";

export interface IAvatarProps {
    url?: URL | string;
    size?: number;
    name?: string;
    user?: IUser;
}
