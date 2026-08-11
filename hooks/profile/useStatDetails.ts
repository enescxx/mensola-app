import { useQuery } from "@tanstack/react-query";

import { ProfileService } from "../../services/profile.service";
import { Alert } from "react-native";

const useStatDetails = (statType: string, initialData?: any, userId?: string) => {
    return useQuery({
        queryKey: ["stat-detail", statType, userId || "me"],
        queryFn: async () => {
            const response = await ProfileService.getStatDetails(statType, userId);

            return response.data.items;
        },
        initialData: initialData,
        enabled: !!statType,
    });
};

export { useStatDetails };
