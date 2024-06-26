import { api } from "@/api";
import { User } from "@/api/users";

type Sale = {
  id: number;
  user: User;
  createdAt: Date;
};

export async function getRecentSales(): Promise<Sale[]> {
  const { data } = await api.get<Sale[]>(`/sales`);
  return data;
}
