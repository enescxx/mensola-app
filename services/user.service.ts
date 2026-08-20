import { FollowActionResponse, FollowActionResponseData } from "@/types/user.types";
import { client } from "../api/client";
import { UserId } from "@/types/common.types";

const UserService = {
    follow: async (targetUserId: UserId): Promise<FollowActionResponse> => {
        return await client.post<FollowActionResponse>(`/v1/users/${targetUserId}/follow`, {}, { auth: true });
    },

    unfollow: async (targetUserId: UserId): Promise<FollowActionResponse> => {
        return await client.delete(`/v1/users/${targetUserId}/follow`, { auth: true });
    },
};

export { UserService };
