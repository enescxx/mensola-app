export interface IChangeEmailProps {
    currentEmail: string;
    onSuccess?: (newEmail: string) => void;
}
