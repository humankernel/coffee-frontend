// shadcn
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, PlusIcon, XIcon } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

import {
    type ColumnDef,
    flexRender,
    type ColumnFiltersState,
    type SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filterBy: keyof TData
    onDelete?: (id: number) => void;
    insertForm?: React.ReactNode
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterBy,
    onDelete,
    insertForm
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: { sorting, columnFilters, rowSelection },
    })

    const handleDelete = () => {
        const idxs = Object.keys(rowSelection).map(Number)

        if (onDelete)
            for (const idx of idxs) if (data) onDelete(data[idx].id);
    }

    return (
        <Card>
            <div className="flex items-center p-4 gap-4">
                <div className="relative">
                    <Input
                        placeholder={`Filtrar por ${filterBy as string}`}
                        value={(table.getColumn(filterBy as string)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(filterBy as string)?.setFilterValue(event.target.value)
                        }
                        className="max-w-lg pl-8"
                    />
                    <SearchIcon size={15} className="absolute top-3 left-2" />
                </div>
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
                </div>
                {onDelete &&
                    <Button onClick={handleDelete} size="sm" variant="secondary">
                        <XIcon className="mr-2 w-4 h-4" />
                        Eliminar
                    </Button>
                }
                <InsertDialog form={insertForm} />
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No resultados
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 p-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={table.previousPage}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={table.nextPage}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                </Button>
            </div>
        </Card >
    )
}


function InsertDialog({ form }: { form: React.ReactNode }) {
    return <Dialog>
        <DialogTrigger asChild>
            <Button size="sm">
                <PlusIcon className='mr-2 w-4 h-4' /> Añadir
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Insertar //name//</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                {form}
            </div>
        </DialogContent>
    </Dialog>
}

