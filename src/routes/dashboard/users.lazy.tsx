import { DataTable } from '@/components/data-table'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/queries/users'
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

export const Route = createLazyFileRoute('/dashboard/users')({
    component: UsersPage
})

function UsersPage() {
    const { data, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })

    if (error || !data) return "error"

    return <div className="container mx-auto py-4">
        <DataTable
            columns={columns}
            data={data}
            filterBy="username"
            DeleteBtn={
                <Button onClick={() => { }} size="sm" variant="secondary">
                    Delete
                </Button>
            }
            InsertBtn={<InsertDialog />}
        />
    </div>
}

function InsertDialog() {
    return <Dialog>
        <DialogTrigger asChild>
            <Button size="sm">Insertar</Button>
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
