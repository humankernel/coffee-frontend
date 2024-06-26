import type { ColumnDef } from "@tanstack/react-table"
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
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Product } from '@/api/products'
import { UpdateProductForm } from "@/components/forms/product"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export const columns: ColumnDef<Product>[] = [
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
        accessorKey: "name",
        header: ({ column }) =>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nombre
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
    },
    {
        accessorKey: "desc",
        header: "Descripcion",
    },
    {
        accessorKey: "price",
        header: "Precio",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "type",
        header: "Tipo",
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
                <DialogTitle>Actualizar Producto</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <UpdateProductForm id={id} />
            </div>
        </DialogContent>
    </Dialog>
}
