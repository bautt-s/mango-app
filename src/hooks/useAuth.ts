import { AuthResponse } from "@/types";
import { createHook } from "./createHook";

export const useLogin = createHook<{
    email: string;
    password: string;
}, AuthResponse>("/login", "post");

export const useRegister = createHook<{
    username: string,
    email: string,
    phone: string,
    password: string,
    password_confirmation: string
}, AuthResponse>("/register", "post");

export const useSendCode = createHook<{
    email: string;
}, { success: boolean, data: string, message?: string }>("/send-code", "post");

export const useValidateCode = createHook<{
    email: string;
    code: string;
}, { success: boolean, data: string, message?: string }>("/validate-code", "post");

export const useResetPassword = createHook<{
    email: string;
    code: string;
    password: string;
    password_confirmation: string;
}, { success: boolean, data: string, message?: string }>("/reset-password", "post");
