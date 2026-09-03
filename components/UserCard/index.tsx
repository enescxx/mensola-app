import { View, Text } from "react-native";

import { styles } from "./styles";
import { IUserCardProps, FollowState } from "./types";

import Button from "../Button";
import Avatar from "../Avatar";
import { ListGroupItem } from "../ListGroup";
import { useTranslation } from "react-i18next";

export default function UserCard({ user, currentUserId, onFollowPress, onCardPress, isFirst, isLast }: IUserCardProps) {
    const isSelf = user.id === currentUserId;
    const { t } = useTranslation();

    let followState: FollowState;

    if (isSelf) {
        followState = "SELF";
    } else if (user.isFollowing) {
        followState = "FOLLOWING";
    } else if (user.isPending) {
        followState = "REQUESTED";
    } else if (user.isFollower) {
        followState = "FOLLOW_BACK";
    } else {
        followState = "FOLLOW";
    }

    const getButtonContent = () => {
        switch (followState) {
            case "FOLLOWING":
                return {
                    text: t("userCard.following"),
                    style: styles.btnFollowing,
                };
            case "REQUESTED":
                return {
                    text: t("userCard.requested"),
                    style: styles.btnFollowing,
                };
            case "FOLLOW_BACK":
                return {
                    text: t("userCard.followBack"),
                    style: styles.btnFollow,
                };
            case "FOLLOW":
                return {
                    text: t("userCard.follow"),
                    style: styles.btnFollow,
                };
            default:
                return null;
        }
    };

    const buttonConfig = getButtonContent();

    return (
        <ListGroupItem isFirst={isFirst} isLast={isLast} onPress={() => onCardPress?.(user.id)} style={{ paddingVertical: 10 }}>
            <View style={styles.leftWrapper}>
                <Avatar user={user} size={34} />
                <View style={styles.nameWrapper}>
                    {user.fullname ? <Text style={styles.fullnameText}>{user.fullname}</Text> : null}
                    <Text style={styles.usernameText}>@{user.username}</Text>
                </View>
            </View>
            {!isSelf && buttonConfig && (
                <Button
                    label={buttonConfig.text}
                    onPress={() => onFollowPress?.(user.id, user.isFollowing ?? false, user.isPending ?? false)}
                    style={buttonConfig.style}
                    labelStyle={styles.btnText}
                    activeOpacity={0.7}
                />
            )}
        </ListGroupItem>
    );
}
