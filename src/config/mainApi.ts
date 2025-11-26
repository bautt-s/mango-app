// src/config/mainApi.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL
console.log(API_URL)
export const mainApi = axios.create({
    baseURL: API_URL,
});

mainApi.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de response con manejo de token expirado
mainApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Manejar token expirado o no autorizado
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Limpiar token
            localStorage.removeItem("token");

            // Solo redirigir si no estamos ya en la página de login
            if (!window.location.pathname.includes("/login")) {
                window.location.href = "/login";

                /* TODO: toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.", {
                    position: "bottom-right",
                    autoClose: 3000,
                });*/
            }

            return Promise.reject(error);
        }

        // TODO: Manejar otros errores del servidor
        /* if (error.response) {
            const { data } = error.response;

            // Si el backend devuelve {success: false, message: "..."}
            if (data && !data.success && data.message) {
                toast.error(data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } else if (error.request) {
            // Error de conexión
            toast.error("Error de conexión con el servidor", {
                position: "bottom-right",
            });
        } */

        return Promise.reject(error);
    }
);
