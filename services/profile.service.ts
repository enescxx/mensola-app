import { client } from "../api/client";

import { GetProfileResponse } from "../types";

const ProfileService = {
    getMe: async (): Promise<GetProfileResponse> => {
        return client.get<GetProfileResponse>("/users/me", {
            auth: true
        });
    },

    getProfile: async (profileId: string): Promise<GetProfileResponse> => {
        return client.get<GetProfileResponse>(`/users/${profileId}`, {
            auth: true
        });
    }
};

export { ProfileService };
