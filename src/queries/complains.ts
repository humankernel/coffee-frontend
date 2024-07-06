import { deleteCs, getCs } from "@/api/qs";
import {
    queryOptions,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const csOptions = queryOptions({
    queryKey: ["cs"],
    queryFn: getCs,
});

export function useDeleteCs() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCs,
        onSuccess: (data) => {
            toast.success(
                `Queja/Sugerencia ${data.id} correctamente eliminada`,
            );
            queryClient.invalidateQueries({ queryKey: ["cs"] });
        },
        onError: (error) => {
            toast.error("Error al eliminar la queja/sugerencia");
            if (error instanceof AxiosError)
                toast.error(error.response?.data?.message);
        },
    });
}
