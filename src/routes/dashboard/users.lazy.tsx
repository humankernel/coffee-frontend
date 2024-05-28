import { DataTable } from '@/components/data-table'
import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from "@tanstack/react-table"
import { useQuery } from '@tanstack/react-query'

// ui
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { User, getUsers } from '@/queries/users'

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
        <DataTable columns={columns} data={data} filterBy="username" />
    </div>
}


export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "id"
    },
    {
        accessorKey: "username",
        header: ({ column }) =>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Usuario
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "role",
        header: "Rol",
        cell: ({ row }) =>
            <Badge>{row.original.role}</Badge>
    },
    {
        accessorKey: "acciones",
        cell: ({ row }) =>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(row.original.id.toString())}
                    >
                        Copiar ID
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
    }
]
