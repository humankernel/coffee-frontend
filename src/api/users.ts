import { toast } from "sonner";
import { api } from "@/api";

export enum Role {
  manager = "manager",
  almacenero = "almacenero",
  customer = "customer",
  supplier = "supplier",
}

export type User = {
  id: number;
  name: string;
  age: number;
  username: string;
  password: string;
  role: Role;
};

export async function getUser(id: number): Promise<User> {
  return api
    .get<User>(`/users/${id}`)
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });
}

export async function getUsers(): Promise<User[]> {
  return api
    .get<User[]>("/users")
    .then(({ data }) => data)
    .catch((error) => {
      toast.error("Error al obtener los usuarios");
      console.error(error);
    });
}

export async function insertUser(user: Omit<User, "id">): Promise<User> {
  console.log(user);
  return api.post<User>("/users", user);
}

export async function updateUser(
  id: number,
  user: Partial<User>,
): Promise<User> {
  return api.patch<User>(`/users/${id}`, user);
}

export async function deleteUser(id: number): Promise<User> {
  return api
    .delete<User>(`/users/${id}`)
    .then(({ data }) => {
      toast("Usuario eliminado correctamente");
      return data;
    })
    .catch((error) => {
      toast.error("Error al eliminar el usuario");
      console.error(error);
    });
}
