import type { ColumnDef } from "@tanstack/react-table";
import { Product, ProductType } from "@/api/products";
import { UpdateProductForm } from "@/components/forms/product";
import { UpdateDialog } from "@/components/dialog";
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
import { ArrowUpDownIcon, BananaIcon, CupSodaIcon, MoreHorizontalIcon } from "lucide-react";
import { Stars } from "@/components/product-card";

export const columns: ColumnDef<Product>[] = [
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
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Nombre
                <ArrowUpDownIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "desc",
        header: "Descripcion",
        cell: ({ row }) => {
            const maxLength = 50
            const { desc } = row.original
            const text = desc.length < maxLength
                ? desc
                : desc.slice(0, maxLength) + " ..."
            return <p> {text} </p>
        }
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <Button
                variant="ghost"
                size="sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Precio
                <ArrowUpDownIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);

            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: "type",
        header: "Tipo",
        cell: ({ row }) => {
            if (row.original.type === ProductType.food)
                return <BananaIcon className="mr-2 h-4 w-4" />
            if (row.original.type === ProductType.drink)
                return <CupSodaIcon className="h-4 w-4" />
        }
    },
    {
        accessorKey: "discount",
        header: "Descuento",
        cell: ({ row }) => <span> - {row.original.discount}% </span>
    },
    {
        accessorKey: "stars",
        header: "Estrellas",
        cell: ({ row }) => <Stars stars={row.original.stars} />
    },
    { accessorKey: "people", header: "Reseñas", cell: ({ row }) => <span> +{row.original.people} </span> },
    {
        accessorKey: "acciones",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() =>
                            navigator.clipboard.writeText(
                                row.original.id.toString(),
                            )
                        }
                    >
                        Copiar ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <UpdateDialog title="Producto" >
                            <UpdateProductForm id={row.original.id} />
                        </UpdateDialog>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
