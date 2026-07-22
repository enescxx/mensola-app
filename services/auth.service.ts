import { client } from "../api/client";

import {
    AuthResponse,
    LogoutResponse,
    ForgotPasswordResponse,
    VerifyResetCodeResponse,
    ResetPasswordResponse
} from "../types";

const AuthService = {
    login: async (credentials: Record<string, any>): Promise<AuthResponse> => {
        return client.post<AuthResponse>("/auth/login", credentials, {
            auth: false
        });
    },

    register: async (
        credentials: Record<string, string>
    ): Promise<AuthResponse> => {
        return client.post<AuthResponse>("/auth/register", credentials, {
            auth: false
        });
    },

    logout: async (refreshToken): Promise<LogoutResponse> => {
        return client.post<LogoutResponse>(
            "/auth/logout",
            { refreshToken },
            { auth: false }
        );
    },

    forgotPassword: async (email): Promise<ForgotPasswordResponse> => {
        return client.post<ForgotPasswordResponse>(
            "/auth/forgot-password",
            { email },
            { auth: false }
        );
    },

    verifyResetToken: async (credentials): Promise<VerifyResetCodeResponse> => {
        return client.post<VerifyResetCodeResponse>(
            "/auth/verify-reset-code",
            credentials,
            { auth: false }
        );
    },

    resetPassword: async (credentials): Promise<ResetPasswordResponse> => {
        return client.post<ResetPasswordResponse>(
            "/auth/reset-password",
            credentials,
            { auth: false }
        );
    }
};

export { AuthService };
