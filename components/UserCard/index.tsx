import { TouchableOpacity, View, Image, Text } from "react-native";

import { styles } from "./styles";
import { IUserCardProps, FollowState } from "./types";

import Button from "../Button";

export default function UserCard({
    user,
    currentUserId,
    onFollowPress,
    onCardPress
}: IUserCardProps) {
    const isSelf = user.id === currentUserId;

    let followState: FollowState;

    if (isSelf) {
        followState = "SELF";
    } else if (user.isFollowing) {
        followState = "FOLLOWING";
    } else if (user.isFollower) {
        followState = "FOLLOW_BACK";
    } else {
        followState = "FOLLOW";
    }

    const getButtonContent = () => {
        switch (followState) {
            case "FOLLOWING":
                return {
                    text: "Takip Ediliyor",
                    style: styles.btnFollowing
                };
            case "FOLLOW_BACK":
                return {
                    text: "Sen de Takip Et",
                    style: styles.btnFollow
                };
            case "FOLLOW":
                return {
                    text: "Takip Et",
                    style: styles.btnFollow
                };
            default:
                return null;
        }
    };

    const buttonConfig = getButtonContent();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onCardPress(user.id)}
            activeOpacity={0.7}
        >
            <View style={styles.imageWrapper}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
            </View>
            <View style={styles.nameWrapper}>
                {user.fullname ? (
                    <Text style={styles.fullnameText}>{user.fullname}</Text>
                ) : null}
                <Text style={styles.usernameText}>@{user.username}</Text>
            </View>
            {!isSelf && buttonConfig && (
                <Button
                    label={buttonConfig.text}
                    onPress={() => onFollowPress?.(user.id, user.isFollowing)}
                    style={buttonConfig.style}
                    labelStyle={styles.btnText}
                    activeOpacity={0.7}
                />
            )}
        </TouchableOpacity>
    );
}
