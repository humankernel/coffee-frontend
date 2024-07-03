import { api } from "@/api";
import { Role } from "@/api/users";
import { createContext, useCallback, useContext, useState } from "react";

interface User {
    sub: number;
    username: string;
    role: Role;
    iat: number;
    exp: number;
}

interface LoginCredentials {
    username: string;
    password: string;
}

interface RegisterCredentials extends LoginCredentials {
    name: string;
    age: number;
}

export interface AuthContext {
    token: string | null;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    user: User | null;
}

interface LoginRes {
    token: string;
}

const AuthContext = createContext<AuthContext | null>(null);

const key = "auth.user";

function getStoredUser(): User | null {
    const storedUser = localStorage.getItem(key);
    if (storedUser) return JSON.parse(storedUser);
    return null;
}

function persistUser(user: User | null) {
    if (user) {
        const serializedUser = JSON.stringify(user);
        localStorage.setItem(key, serializedUser);
    } else localStorage.removeItem(key);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(getStoredUser());
    const isAuthenticated = !!token;

    const logout = useCallback(async () => {
        setToken(null);
        setUser(null);
        persistUser(null);
    }, []);

    const login = useCallback(async (credentials: LoginCredentials) => {
        const { data } = await api.post<LoginRes>("/auth/login", credentials);
        if (!data.token) throw new Error("Error while trying to login");

        const { data: userRes } = await api.get<User>("/auth/me", {
            headers: { Authorization: `Bearer ${data.token}` },
        });
        if (!userRes)
            throw new Error(
                "An Error happend while trying to fetch user's data",
            );

        setToken(data.token);
        setUser(userRes);
        persistUser(userRes);
    }, []);

    const register = useCallback(
        async (credentials: RegisterCredentials) => {
            const { data } = await api.post<LoginRes>(
                "/auth/register",
                credentials,
            );
            if (!data) throw new Error("Error while trying to register");

            await login(credentials);
        },
        [login],
    );

    return (
        <AuthContext.Provider
            value={{ token, isAuthenticated, user, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
