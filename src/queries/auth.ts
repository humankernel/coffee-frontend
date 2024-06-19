import { api } from "@/api";
import { User } from "./users";

type LoginResponse = {
  token: string;
  user: User;
};

type LoginUser = {
  username: string;
  password: string;
};

type RegisterUser = LoginUser & { name: string };

export async function login(userData: LoginUser) {
  const { data, error } = await api.post<LoginResponse>(
    "/auth/login",
    userData,
  );

  if (error || !data) throw new Error("Error while registing user");

  console.log(data);
}

export async function register(userData: RegisterUser) {
  const { data, error } = await api.post<LoginResponse>(
    "/auth/register",
    userData,
  );

  if (error || !data) throw new Error("Error while registing user");

  console.log(data);
}
