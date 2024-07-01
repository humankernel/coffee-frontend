import { api } from "@/api"
import { createContext, useCallback, useContext, useState } from "react"
import { extendTailwindMerge } from "tailwind-merge"

interface User {
    sub: number
    username: string
    role: string
    iat: number
    exp: number
}

interface LoginCredentials {
    username: string
    password: string
}

interface RegisterCredentials extends LoginCredentials {
    name: string
    age: number
}

export interface AuthContext {
    token: string | null
    isAuthenticated: boolean
    login: (Credentials: LoginCredentials) => Promise<void>
    logout: () => Promise<void>
    register: (Credentials: RegisterCredentials) => Promise<void>
    user: User | null
}

interface LoginRes { token: string }

const AuthContext = createContext<AuthContext | null>(null)

const key = 'auth.user'

function getStoredUser(): User | null {
    const storedUser = localStorage.getItem(key)
    if (storedUser) return JSON.parse(storedUser)
    return null
}

function setStoredUser(user: User | null) {
    const serializedUser = JSON.stringify(user)
    if (user) localStorage.setItem(key, serializedUser)
    else localStorage.removeItem(key)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(getStoredUser())
    const isAuthenticated = !!token

    const logout = useCallback(async () => {
        setToken(null)
        setUser(null)
        setStoredUser(null)
    }, [])

    const login = useCallback(async (credentials: { username: string, password: string }) => {
        const { data } = await api.post<LoginRes>("/auth/login", credentials)
        if (!data.token) throw new Error("Error while trying to login")

        const { data: userRes } = await api.get<User>("/auth/me", {
            headers: { Authorization: `Bearer ${data.token}` }
        })
        if (!userRes) throw new Error("An Error happend while trying to fetch user's data")

        setToken(data.token)
        setUser(userRes)
        setStoredUser(userRes)
    }, [])

    const register = useCallback(async () => { }, [])

    return <AuthContext.Provider value={{ token, isAuthenticated, user, login, register, logout }}>
        {children}
    </AuthContext.Provider>

}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}

