export type UsernameStatus = "idle" | "checking" | "available" | "taken" | "invalid";

export interface IChangeUsernameProps {
    currentUsername: string;
    currentFullname?: string;
    currentAvatar?: string;
    userId?: string;
    onSuccess?: (newUsername: string) => void;
}
