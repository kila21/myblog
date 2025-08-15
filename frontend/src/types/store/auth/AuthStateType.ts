export interface AuthStateType {
    user: string | null
    token: string | null;
    isLoading: boolean;
    error: AuthError
}

export type AuthError = string | Record<string, string[]> | null;