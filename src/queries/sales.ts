import { api } from "@/api";
import { toast } from "sonner";
import { User } from "./users";

type Sale = {
  id: number;
  user: User;
  createdAt: Date;
};

export async function getRecentSales(): Promise<Sale[]> {
  return api
    .get<Sale>(`/sales`)
    .then(({ data }) => data)
    .catch((error) => {
      toast.error("Error to fetch recent sales");
      console.error(error);
    });
}
