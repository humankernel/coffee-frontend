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
import { CalendarIcon, MoreHorizontal } from "lucide-react";
import { UpdateDialog } from "@/components/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { PurchaseOrder } from "@/api/orders";

export const columns: ColumnDef<PurchaseOrder>[] = [
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
    },
    {
        accessorKey: "createdAt",
        header: "Fecha",
    },
    {
        accessorKey: "products",
        header: "Productos",
        cell: ({ row }) => <span> {row.original.products} </span>
    },
    {
        accessorKey: "status",
        header: "Estado",
    },
    {
        accessorKey: "createdAt",
        header: "Fecha de Creacion",
        cell: ({ row }) => (
            <Popover>
                <PopoverTrigger>
                    <Button variant="ghost">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {new Date(row.original.createdAt)
                            .toISOString()
                            .slice(0, 10)}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Calendar
                        mode="default"
                        selected={row.original.createdAt}
                    />
                </PopoverContent>
            </Popover>
        )
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
                            row.original.id.toString(),
                        )
                    }>
                        Copiar ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <UpdateDialog title="Queja/Sugerencia">
                            <UpdateCsForm id={row.original.id} />
                        </UpdateDialog>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

