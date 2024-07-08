import {
    User,
    createUser,
    deleteUserById,
    getUserById,
    getUsers,
    updateUserById,
} from "@/api/users";
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
        queryFn: () => getUserById(id),
        enabled: !!id,
    });

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,
        onSuccess: (data) => {
            toast.success(`Usuario ${data.name} correctamente creado`);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            toast.error("Error al crear el usuario");
            if (error instanceof AxiosError)
                toast.error(error.response?.data?.message);
        },
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, user }: { id: number; user: Omit<User, "id"> }) =>
            updateUserById(id, user),
        onSuccess: (data) => {
            toast.success(`Usuario ${data.name} correctamente actualizado`);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            toast.error("Error al actualizar el usuario");
            if (error instanceof AxiosError)
                toast.error(error.response?.data?.message);
        },
    });
}

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
