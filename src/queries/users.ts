import { env } from "@/env";

export enum Role {
  manager = "manager",
  almacenero = "almacenero",
  customer = "customer",
  supplier = "supplier",
}

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
  role: Role;
};

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${env.API_BASE}/users`);
  return res.json();
}
