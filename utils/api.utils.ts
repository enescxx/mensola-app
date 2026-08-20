import { ApiResponse } from "@/types/api";

export function isApiError(err: unknown): err is ApiResponse {
    return (
        typeof err === "object" && err !== null && "success" in err && (err as { success: boolean }).success === false
    );
}
