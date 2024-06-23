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
import type { ColumnDef } from "@tanstack/react-table"
import { User } from '@/api/users'
import { UpdateUserForm } from "../forms/user"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

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
                    <DropdownMenuItem onSelect={e => e.preventDefault()}>
                        <UpdateDialog id={row.original.id} />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
    }
]

function UpdateDialog({ id }: { id: number }) {
    return <Dialog>
        <DialogTrigger>
            Actualizar
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Actualizar Usuario</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <UpdateUserForm id={id} />
            </div>
        </DialogContent>
    </Dialog>
}
