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
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ReportResponse, ReportType } from "@/api/report";

export const columns: ColumnDef<ReportResponse>[] = [
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
        accessorKey: "desc",
        header: "Descripcion",
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
        accessorKey: "type",
        header: "Tipo",
        cell: ({ row }) => {
            const { type } = row.original
            let className: string = "";

            if (type === ReportType.missing)
                className = "bg-red-400"
            else if (type === ReportType.surplus)
                className = "bg-green-400"

            return <Badge className={className}> {type} </Badge>
        }
    },
    {
        accessorKey: "product",
        header: "Id del Producto",
        cell: ({ row }) => <div> {row.original.product.id} </div>
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
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

