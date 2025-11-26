import { User } from "./user.types";

export interface LoginType {
    success: boolean;
    data: {
        token: string;
        user: User;
    }
    message?: string;
}
