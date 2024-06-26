import { api } from "@/api";
import { z } from "zod";

type LoginRes = { token: string };

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const registerSchema = loginSchema.extend({
  name: z.string(),
  age: z.number(),
});

type LoginParams = z.infer<typeof loginSchema>;
type RegisterParams = z.infer<typeof registerSchema>;

export async function login(loginData: LoginParams) {
  try {
    const { data } = await api.post<LoginRes>("/auth/login", loginData);
    if (!data) throw new Error("Error while login user");

    console.log(data);
  } catch (error) {}
}

export async function register(registerData: RegisterParams) {
  console.log(registerData);
  try {
    const { data } = await api.post<LoginRes>("/auth/register", registerData);
    if (!data) throw new Error("Error while registing user");

    console.log(data);
  } catch (error) {}
}
