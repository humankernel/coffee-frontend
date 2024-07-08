import { DataTable } from "@/components/table/data-table";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CreateUserForm } from "@/components/forms/user";
import { columns } from "@/components/table/columns/user";
import { useDeleteUser, usersOptions } from "@/queries/users";

export const Route = createFileRoute("/_dashboard/dashboard/users")({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(usersOptions),
    component: UsersPage,
});

function UsersPage() {
    const { data: users } = useSuspenseQuery(usersOptions)
    const { mutate: deleteUserById } = useDeleteUser()

    return (
        <div className="container mx-auto py-4">
            <DataTable
                name="Usuario"
                columns={columns}
                data={users ?? []}
                filterBy="username"
                insertForm={<CreateUserForm />}
                onDelete={deleteUserById}
            />
        </div>
    );
}
