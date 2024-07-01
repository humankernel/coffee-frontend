import { DataTable } from '@/components/table/data-table'
import { createLazyFileRoute } from '@tanstack/react-router'

import { deleteProduct, getProducts } from '@/api/products'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { InsertProductForm } from '@/components/forms/product'
import { columns } from '@/components/table/columns/products'
import { toast } from 'sonner'

export const Route = createLazyFileRoute('/dashboard/inventory')({
    component: InventoryPage
})

function InventoryPage() {
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })

    const { mutate } = useMutation({
        mutationKey: ['delete-product'],
        mutationFn: deleteProduct,
        onSuccess: () => {
            toast.success("Producto correctamente eliminado")
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
        onError: () => toast.error("Error al eliminar el producto")
    })

    return <main className="container mx-auto py-4">
        <DataTable
            columns={columns}
            data={data ?? []}
            filterBy="name"
            insertForm={<InsertProductForm />}
            onDelete={mutate}
        />
    </main>
}





