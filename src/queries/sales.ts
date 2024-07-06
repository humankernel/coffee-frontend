import { getSales } from "@/api/sales";
import { queryOptions } from "@tanstack/react-query";

export const salesOptions = queryOptions({
    queryKey: ["sales"],
    queryFn: () => getSales(),
});
