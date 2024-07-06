import { InsertSaleForm } from "@/components/forms/sales";
import { columns } from "@/components/table/columns/sales";
import { DataTable } from "@/components/table/data-table";
import { salesOptions } from "@/queries/sales";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard/sales")({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(salesOptions),
    component: SalesPage,
});

function SalesPage() {
    const { data: sales } = useSuspenseQuery(salesOptions)

    return (
        <main className="container mx-auto py-4">
            <DataTable
                name="Ventas"
                columns={columns}
                data={sales ?? []}
                filterBy="product"
                insertForm={<InsertSaleForm />}
            />
        </main>
    );
}
