import type { ProfileResponseType } from "../../auth/ProfileResponse";


export interface AuthStateType {
    user: ProfileResponseType | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    
}