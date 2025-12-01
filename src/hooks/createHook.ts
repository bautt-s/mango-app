import { mainApi } from "@/config/mainApi";
import { AxiosError } from "axios";



export function createHook<TRequest, TResponse>(
    endpoint: string,
    method: "post" | "get" | "put" | "patch" | "delete" = "post"
) {
    return async (payload: TRequest): Promise<TResponse | { success: false; message: string }> => {
        try {
            const { data } = await mainApi.request<any>({
                url: endpoint,
                method,
                ...(method !== "get" && { data: payload }),
            });

            // Ensure we handle the response based on the "success" field
            if (data.success) {
                // If the response has a "data" field, we try to unwrap it or merge it
                if (data.data !== undefined) {
                    if (typeof data.data === 'object' && data.data !== null) {
                        // If data is an object, merge it with success and message
                        return { ...data.data, success: true, message: data.message };
                    } else {
                        // If data is primitive (e.g. string), return it wrapped
                        // This handles cases like { success: true, data: "code", message: "..." }
                        // casting to TResponse (which should match this structure)
                        return { data: data.data, success: true, message: data.message } as unknown as TResponse;
                    }
                }

                // If no "data" field, return the whole response
                return { ...data, success: true, message: data.message };
            }

            // If success is false in a 200 OK response (rare but possible)
            return { success: false, message: data.message || "Error desconocido" };

        } catch (error) {
            console.error(error);

            if (error instanceof AxiosError) {
                const resp = error.response?.data as {
                    success?: boolean;
                    message?: string;
                };

                // Handle the structured error response: { success: false, message: "..." }
                if (resp && typeof resp === 'object' && resp.message) {
                    return { success: false, message: resp.message };
                }

                // Fallback for other types of errors
                const message = error.response?.statusText || error.message || "Error de conexión";
                return { success: false, message };
            }

            return { success: false, message: "Error desconocido" };
        }
    };
}
