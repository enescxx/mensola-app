import { useLocalSearchParams, Stack } from "expo-router";
import { useStatDetails } from "../../../hooks/profile/useStatDetails";
import { useGlobalUser } from "../../../context/AuthContext";
import { STAT_TITLES } from "../../../constants/pageTitles";
import { StatDetailView } from "@/components/StatDetailView";

export default function StatDetailPage() {
    const { statType } = useLocalSearchParams<{ statType: string }>();
    const pageTitle = STAT_TITLES[statType] || "Detay";

    const { user } = useGlobalUser();

    const { statData, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isLoading, isError, isRefetching } =
        useStatDetails({
            statType,
            userId: user.id,
        });

    return (
        <>
            <Stack.Screen
                options={{
                    title: pageTitle,
                }}
            />
            <StatDetailView
                currentUserId={user.id}
                statType={statType}
                items={statData}
                loadMore={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                isLoading={isLoading}
                isRefetching={isRefetching}
                isError={isError}
                refetch={refetch}
                isOwnProfile={true}
            />
        </>
    );
}
