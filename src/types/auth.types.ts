import { User } from "./user.types";

export interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
    message?: string;
}