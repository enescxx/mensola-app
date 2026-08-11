import { client } from "../api/client";

import { FollowActionsResponse } from "../types";

const UserService = {
    follow: async (targetUserId: string): Promise<FollowActionsResponse> => {
        client.post(`/users/${targetUserId}/follow`, {}, { auth: true });

        return { userId: targetUserId, isFollowing: true };
    },

    unfollow: async (targetUserId: string): Promise<FollowActionsResponse> => {
        client.delete(`/users/${targetUserId}/follow`, { auth: true });

        return { userId: targetUserId, isFollowing: false };
    },
};

export { UserService };
