import type { ColumnDef } from "@tanstack/react-table";
// shadcn
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import { SaleRes } from "@/api/sales";
import { Link } from "@tanstack/react-router";

export const columns: ColumnDef<SaleRes>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
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
        header: "id",
        cell: ({ row }) => <span> {row.original.sale.id} </span>
    },
    {
        accessorKey: "sale",
        header: "Usuario",
        cell: ({ row }) => <span> @{row.original.sale.user.username} </span>
    },
    {
        accessorKey: "amount",
        header: "Cantidad",
    },
    {
        accessorKey: "product",
        header: "Producto",
        cell: ({ row }) => {
            const { name } = row.original.product
            return <Link to="/dashboard/inventory"> {name} </Link>
        }
    },
    {
        accessorKey: "product",
        header: "Dinero",
        cell: ({ row }) => {
            const { amount, product: { price } } = row.original
            return <span> + ${amount * price} </span>
        }
    },
    {
        accessorKey: "acciones",
        cell: ({ row }) => (
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
                    <DropdownMenuItem onClick={() =>
                        navigator.clipboard.writeText(
                            row.original.sale.id.toString(),
                        )
                    } >
                        Copiar ID
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

