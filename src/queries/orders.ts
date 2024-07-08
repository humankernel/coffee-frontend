import {
    createOrder,
    deleteOrder,
    getOrderById,
    getOrders,
    updateOrder,
} from "@/api/orders";
import {
    queryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const ordersOptions = queryOptions({
    queryKey: ["orders"],
    queryFn: getOrders,
});

export function useOrder(id: number) {
    return useQuery({
        queryKey: ["orders", id],
        queryFn: () => getOrderById(id),
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrder,
        onSuccess: (data) => {
            toast.success(`Orden de Compra ${data.id} correctamente insertado`);
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError)
                toast.error(error.response?.data.message);
            else toast.error("Error al insertar el Orden de Compra");
        },
    });
}

export function useDeleteOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteOrder,
        onSuccess: (data) => {
            toast.success(`Orden de Compra ${data.id} correctamente eliminado`);
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError)
                toast.error(error.response?.data.message);
            else toast.error("Error al eliminar el Orden de Compra");
        },
    });
}

export function useUpdateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrder,
        onSuccess: (data) => {
            toast.success(
                `Orden de Compra ${data.id} correctamente actualizada`,
            );
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError)
                toast.error(error.response?.data.message);
            else toast.error("Error al actualizar la Orden de Compra");
        },
    });
}
