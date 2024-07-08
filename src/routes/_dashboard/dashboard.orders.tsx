import { InsertOrderForm } from "@/components/forms/orders";
import { columns } from "@/components/table/columns/orders";
import { DataTable } from "@/components/table/data-table";
import { ordersOptions, useDeleteOrder } from "@/queries/orders";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/_dashboard/dashboard/orders")({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(ordersOptions),
    component: OrdersPage
});

function OrdersPage() {
    const { data: orders } = useSuspenseQuery(ordersOptions)
    const { mutate: deleteOrderById } = useDeleteOrder()

    return (
        <main className="container mx-auto py-4">
            <DataTable
                name="Ordenes de Compra"
                columns={columns}
                data={orders}
                filterBy="supplier"
                onDelete={deleteOrderById}
                insertForm={<InsertOrderForm />}
            />
        </main>
    )
}
