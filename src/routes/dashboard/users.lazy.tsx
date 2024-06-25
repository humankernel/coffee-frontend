import { DataTable } from '@/components/data-table'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteUser, getUsers } from '@/api/users'
import { columns } from '@/components/columns/user'
import { InsertUserForm } from '@/components/forms/user'

export const Route = createLazyFileRoute('/dashboard/users')({
    component: UsersPage,
})

function UsersPage() {
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })

    const { mutate: mutateDelete } = useMutation({
        mutationKey: ['delete-users'],
        mutationFn: deleteUser,
        onSuccess: () => navigate({ to: "/dashboard/users", replace: true })
    })

    const handleDelete = (idxs: number[]) => {
        for (const idx of idxs) if (data) mutateDelete(data[idx].id);
    }

    return <div className="container mx-auto py-4">
        <DataTable
            columns={columns}
            data={data ?? []}
            filterBy="username"
            insertForm={<InsertUserForm />}
            onDelete={handleDelete}
        />
    </div>
}

