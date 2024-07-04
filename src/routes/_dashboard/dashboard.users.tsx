import { DataTable } from "@/components/table/data-table";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers } from "@/api/users";
import { InsertUserForm } from "@/components/forms/user";
import { columns } from "@/components/table/columns/user";
import { toast } from "sonner";

export const Route = createFileRoute("/_dashboard/dashboard/users")({
    component: UsersPage,
});

function UsersPage() {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    const { mutate } = useMutation({
        mutationKey: ["delete-users"],
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("Usuario correctamente eliminado");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => toast.error("Error al eliminar el usuario")
    });

    return (
        <div className="container mx-auto py-4">
            <DataTable
                name="Usuario"
                columns={columns}
                data={data ?? []}
                filterBy="username"
                insertForm={<InsertUserForm />}
                onDelete={mutate}
            />
        </div>
    );
}
