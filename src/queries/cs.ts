import { CS, createCs, getCsById, updateCs } from "@/api/qs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useCs(id: number) {
    return useQuery({
        queryKey: ["cs", id],
        queryFn: () => getCsById(id),
    });
}

export function useCreateCs() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCs,
        onSuccess: (data) => {
            toast.success(
                `Queja/Sugerencia ${data.id} correctamente insertado`,
            );
            queryClient.invalidateQueries({
                queryKey: ["cs"],
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError)
                toast.error(error.response?.data.message);
            else toast.error("Error al insertar la queja/sugerencia");
        },
    });
}

export function useUpdateCs() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, cs }: { id: number; cs: Partial<CS> }) =>
            updateCs(id, cs),
        onSuccess: (data) => {
            toast.success(
                `Queja/Sugerencia ${data.id} correctamente actualizada`,
            );
            queryClient.invalidateQueries({
                queryKey: ["cs"],
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError)
                toast.error(error.response?.data.message);
            else toast.error("Error al actualizar la queja/sugerencia");
        },
    });
}
