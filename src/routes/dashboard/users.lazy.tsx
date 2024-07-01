import { DataTable } from '@/components/table/data-table'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteUser, getUsers } from '@/api/users'
import { InsertUserForm } from '@/components/forms/user'
import { columns } from '@/components/table/columns/user'
import { toast } from 'sonner'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/dashboard/users')({
    component: UsersPage,
})

function UsersPage() {
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })

    const { mutate, } = useMutation({
        mutationKey: ['delete-users'],
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("Usuario correctamente eliminado")
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
        onError: () => toast.error("Error al eliminar el usuario")
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

