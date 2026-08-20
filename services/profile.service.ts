import { GetProfileRequest, GetProfileResponse } from "@/types/user.types";
import { client } from "../api/client";
import { GetStatDetailsRequest, STAT_ENDPOINT_MAP, StatDetailsResponse, StatType } from "@/types/stat.types";

const ProfileService = {
    getProfile: async (data: GetProfileRequest): Promise<GetProfileResponse> => {
        return client.get<GetProfileResponse>(`/v1/users/${data.userId}`, { auth: true });
    },

    getStatDetails: async <T extends StatType>(data: GetStatDetailsRequest<T>): Promise<StatDetailsResponse<T>> => {
        const { statType, userId, page, limit } = data;
        return await client.get<StatDetailsResponse<T>>(`/v1${STAT_ENDPOINT_MAP[statType]}`, {
            auth: true,
            params: { userId, page, limit },
        });
    },
};

export { ProfileService };
