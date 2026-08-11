import { IComment, IUser, IUserInteraction } from "@/types";

type IInteractionViewProps = {
    data: Pick<IUserInteraction, "id" | "isLiked" | "rating"> & {
        user: Pick<IUser, "id" | "username" | "fullname" | "avatar">;
        comment: Pick<IComment, "id" | "content"> & { date: IComment["createdAt"] };
        likeCount: number;
        replyCount: number;
    };
};

export { IInteractionViewProps };
