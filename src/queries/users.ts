import { getUser } from "@/api/users";
import { queryOptions } from "@tanstack/react-query";

export const userOptions = (id: number) =>
    queryOptions({
        queryKey: [id, "products"],
        queryFn: () => getUser(id),
    });
