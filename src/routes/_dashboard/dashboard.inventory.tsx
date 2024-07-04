import { DataTable } from "@/components/table/data-table";
import { createFileRoute } from "@tanstack/react-router";

import { deleteProduct } from "@/api/products";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { InsertProductForm } from "@/components/forms/product";
import { columns } from "@/components/table/columns/products";
import { toast } from "sonner";
import { productsOptions } from "@/queries/products";
import { Sort } from "../_public/store";

export const Route = createFileRoute("/_dashboard/dashboard/inventory")({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(productsOptions({ sort: Sort.newest })),
    component: InventoryPage,
});

function InventoryPage() {
    const { data } = useSuspenseQuery(productsOptions({ sort: Sort.newest }));
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationKey: ["delete-product"],
        mutationFn: deleteProduct,
        onSuccess: () => {
            toast.success("Producto correctamente eliminado");
            queryClient.invalidateQueries({ queryKey: [{ sort: Sort.newest }, "products"] });
        },
        onError: () => {
            toast.error("Error al eliminar el producto")
        }
    });


    return (
        <main className="container mx-auto py-4">
            <DataTable
                name="Producto"
                columns={columns}
                data={data ?? []}
                filterBy="name"
                insertForm={<InsertProductForm />}
                onDelete={mutate}
            />
        </main>
    );
}
