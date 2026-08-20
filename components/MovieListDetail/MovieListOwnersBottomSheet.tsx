import { useState, useEffect } from "react";
import { FlatList, Alert, View } from "react-native";
import { useRouter } from "expo-router";

import BottomSheet from "@/components/BottomSheet";
import UserCard from "@/components/UserCard";
import { useGlobalUser } from "@/context/AuthContext";
import { useFollow } from "@/hooks/user/useFollow";
import { IMovieListOwnersBottomSheetProps } from "./types";
import { FollowUsersResponseDataItem, IUser } from "@/types/user.types";
import { UserId } from "@/types/common.types";

export default function MovieListOwnersBottomSheet({
    isVisible,
    onClose,
    owners: initialOwners,
}: IMovieListOwnersBottomSheetProps) {
    const router = useRouter();
    const { user: currentUser } = useGlobalUser();
    const { followHandler, unfollowHandler, error: followError } = useFollow();
    const [owners, setOwners] = useState<FollowUsersResponseDataItem[]>(initialOwners);

    useEffect(() => {
        setOwners(initialOwners);
    }, [initialOwners]);

    useEffect(() => {
        if (followError) {
            Alert.alert("Hata", followError);
        }
    }, [followError]);

    const toggleFollowState = (targetUserId: string) => {
        setOwners((prevOwners) =>
            prevOwners.map((item) => (item.id === targetUserId ? { ...item, isFollowing: !item.isFollowing } : item)),
        );
    };

    const handleFollowPress = (targetUserId: UserId, isFollowing?: boolean) => {
        const targetUser = owners.find((o) => o.id === targetUserId);
        const name = targetUser?.fullname || targetUser?.username || "kullanıcı";

        if (isFollowing) {
            Alert.alert("Takipten Çık", `${name} adlı kişiyi takip etmeyi bırakmak istediğinize emin misiniz?`, [
                { text: "Vazgeç", style: "cancel" },
                {
                    text: "Takipten Çık",
                    style: "destructive",
                    onPress: () => {
                        unfollowHandler(targetUserId, () => toggleFollowState(targetUserId));
                    },
                },
            ]);
        } else {
            followHandler(targetUserId, () => toggleFollowState(targetUserId));
        }
    };

    const handleCardPress = (targetUserId: string) => {
        onClose();
        router.push(`/users/${targetUserId}`);
    };

    return (
        <BottomSheet isVisible={isVisible} onClose={onClose} title="Yöneticiler">
            <FlatList
                data={owners}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                renderItem={({ item }) => (
                    <UserCard
                        user={{
                            ...item,
                            avatar: item.avatar ?? undefined,
                        }}
                        currentUserId={currentUser?.id as UserId}
                        onFollowPress={handleFollowPress}
                        onCardPress={handleCardPress}
                    />
                )}
            />
        </BottomSheet>
    );
}
