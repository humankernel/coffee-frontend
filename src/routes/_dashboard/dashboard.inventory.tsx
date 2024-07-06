import { DataTable } from "@/components/table/data-table";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CreateProductForm } from "@/components/forms/product";
import { columns } from "@/components/table/columns/products";
import { productsOptions, useDeleteProduct } from "@/queries/products";
import { Sort } from "../_public/store";

export const Route = createFileRoute("/_dashboard/dashboard/inventory")({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(productsOptions({ sort: Sort.newest })),
    component: InventoryPage,
});

function InventoryPage() {
    const { data: products } = useSuspenseQuery(productsOptions({ sort: Sort.newest }));
    const { mutate: deleteProductById } = useDeleteProduct()

    return (
        <main className="container mx-auto py-4">
            <DataTable
                name="Producto"
                columns={columns}
                data={products}
                filterBy="name"
                insertForm={<CreateProductForm />}
                onDelete={deleteProductById}
            />
        </main>
    );
}
