import { AxiosError } from "axios";
import { mainApi } from "../config/mainApi";
import { LoginType, User } from "@/types";

export const useLogin = async (body: { email: string; password: string }): Promise<LoginType | string> => {
    try {
        const { data } = await mainApi.post<{
            success: boolean;
            message: string;
            data: {
                token: string;
                user: User
            };
            errors?: Record<string, string[]>;
        }>("/login", body);

        if (data.success) return data

        // si viene con errores, los formateamos y los agregamos al mensaje
        const errorsString = data.errors ? Object.values(data.errors).flat().join(" | ") : "";

        return errorsString ? `${data.message}` : data.message;
    } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
            const resp = error.response?.data as { message?: string; errors?: Record<string, string[]> } | undefined;
            const errorsString = resp?.errors ? Object.values(resp.errors).flat().join(" | ") : "";
            const message = resp?.message || error.message || "Error de conexión";
            return message
        }
        return "Error desconocido";
    }
};
