export interface AuthStateType {
    user: boolean
    token: string | null;
    isLoading: boolean;
    error: string | null;
    
}