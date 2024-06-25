import { api } from "@/api";
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

const AuthContext = createContext(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState()

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const { data } = await api.get("/auth/me")
                setToken(data.accessToken)
            } catch {
                setToken(null)
            }
        }

        fetchMe();
    }, [])

    // inject the token into every request
    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            config.headers.Authorization =
                !config._retry && token
                    ? `Bearer ${token}`
                    : config.headers.Authorization
            return config;
        })

        return () => {
            api.interceptors.request.eject(authInterceptor)
        }
    }, [token])

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config

                if (
                    error.response.status === 403 &&
                    error.response.data.message === "Unauthorized"
                ) {
                    try {
                        const response = await api.get("/auth/refreshToken");

                        setToken(response.data.accessToken);

                        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                        originalRequest._retry = true;

                        return api(originalRequest)
                    } catch {
                        setToken(null);
                    }
                }

                return Promise.reject(error)
            }
        )

        return () => {
            api.interceptors.response.eject(refreshInterceptor)
        }
    })

    return <AuthContext.Provider value={token}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("useAuth must be used within a AuthProvider")
    }

    return authContext
}
