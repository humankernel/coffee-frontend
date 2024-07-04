import { api } from "@/api";
import { removeEmptyValues } from "@/lib/utils";

export enum Role {
    manager = "manager",
    almacenero = "almacenero",
    supplier = "supplier",
    customer = "customer",
}

export type User = {
    id: number;
    name: string;
    age: number;
    username: string;
    password: string;
    role: Role;
    isActive: boolean
};

export async function getUser(id: number): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
}

export async function getUsers(): Promise<User[]> {
    const { data } = await api.get<User[]>("/users");
    return data;
}

export async function insertUser(user: Omit<User, "id">): Promise<User> {
    const { data } = await api.post<User>("/users", user);
    return data;
}

export async function updateUser(
    id: number,
    user: Partial<User>,
): Promise<User> {
    const userToSend = removeEmptyValues(user);
    const { data } = await api.patch<User>(`/users/${id}`, userToSend);
    return data;
}

export async function deleteUser(id: number): Promise<User> {
    const { data } = await api.delete<User>(`/users/${id}`);
    return data;
}
