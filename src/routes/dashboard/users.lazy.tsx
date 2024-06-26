import { DataTable } from '@/components/table/data-table'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteUser, getUsers } from '@/api/users'
import { InsertUserForm } from '@/components/forms/user'
import { columns } from '@/components/table/columns/user'

export const Route = createLazyFileRoute('/dashboard/users')({
    component: UsersPage,
})

function UsersPage() {
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })

    const { mutate } = useMutation({
        mutationKey: ['delete-users'],
        mutationFn: deleteUser,
        onSuccess: () => navigate({ to: "/dashboard/users", replace: true })
    })

    return <div className="container mx-auto py-4">
        <DataTable
            columns={columns}
            data={data ?? []}
            filterBy="username"
            insertForm={<InsertUserForm />}
            onDelete={mutate}
        />
    </div>
}

