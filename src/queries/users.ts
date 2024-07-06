import { deleteUserById, getUser, getUsers } from "@/api/users";
import {
    queryOptions,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const usersOptions = queryOptions({
    queryKey: ["users"],
    queryFn: getUsers,
});

export const userOptions = (id: number) =>
    queryOptions({
        queryKey: ["users", id],
        queryFn: () => getUser(id),
        enabled: !!id,
    });

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUserById,
        onSuccess: (data) => {
            toast.success(`Usuario ${data.name} correctamente desactivado`);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            toast.error("Error al desactivar el usuario");
            if (error instanceof AxiosError)
                toast.error(error.response?.data?.message);
        },
    });
}
