import { DataTable } from '@/components/data-table'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteUser, getUsers } from '@/api/users'
import { columns } from '@/components/columns/user'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InsertUserForm } from "@/components/forms/user"
import { PlusIcon } from 'lucide-react'

export const Route = createLazyFileRoute('/dashboard/users')({
    component: UsersPage,
})

function UsersPage() {
    const { data, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })

    const { mutate } = useMutation({
        mutationKey: ['delete-users'],
        mutationFn: deleteUser
    })

    if (error) throw new Error(error?.message)

    const handleDelete = (idxs: number[]) => {
        for (const idx of idxs) if (data) mutate(data[idx].id);
    }

    return <div className="container mx-auto py-4">
        <DataTable
            columns={columns}
            data={data ?? []}
            filterBy="username"
            deleteBtn
            InsertBtn={<InsertDialog />}
            onDelete={handleDelete}
        />
    </div>
}

function InsertDialog() {
    return <Dialog>
        <DialogTrigger asChild>
            <Button size="sm">
                <PlusIcon className='mr-2 w-4 h-4' /> Añadir
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Insertar Usuario</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <InsertUserForm />
            </div>
        </DialogContent>
    </Dialog>
}
