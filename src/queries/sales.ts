import { createSale, getSales } from "@/api/sales";
import {
    queryOptions,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const salesOptions = queryOptions({
    queryKey: ["sales"],
    queryFn: () => getSales(),
});

export function useCreateSale() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSale,
        onSuccess: (data) => {
            toast.success(`Pedido ${data.id} correctamente registrado`);
            queryClient.invalidateQueries({
                queryKey: ["sales"],
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError)
                toast.error(error.response?.data.message);
            else toast.error("Error al realizar el pedido");
        },
    });
}
