import { ApiResponse } from "./api";
import { IUser } from "./user";

type AuthanticatedUser = Pick<
    IUser,
    "id" | "fullname" | "username" | "bio" | "avatar"
>;

interface AuthData {
    accessToken: string;
    refreshToken: string;
    user: AuthanticatedUser;
}

interface LogoutData {
    message: string;
}

interface ForgotPasswordData {
    message: string;
}

interface VerifyResetCodeData {
    ticket: string;
}

interface ResetPasswordData {
    message: string;
}

type AuthResponse = ApiResponse<AuthData>;
type LogoutResponse = ApiResponse<LogoutData>;
type ForgotPasswordResponse = ApiResponse<ForgotPasswordData>;
type VerifyResetCodeResponse = ApiResponse<VerifyResetCodeData>;
type ResetPasswordResponse = ApiResponse<ResetPasswordData>;

export {
    AuthanticatedUser,
    AuthResponse,
    LogoutResponse,
    ForgotPasswordResponse,
    VerifyResetCodeResponse,
    ResetPasswordResponse
};
