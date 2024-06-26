import { DataTable } from '@/components/table/data-table'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

import { deleteProduct, getProducts } from '@/api/products'
import { useMutation, useQuery } from '@tanstack/react-query'
import { InsertProductForm } from '@/components/forms/product'
import { columns } from '@/components/table/columns/products'

export const Route = createLazyFileRoute('/dashboard/inventory')({
    component: InventoryPage
})

function InventoryPage() {
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })

    const { mutate } = useMutation({
        mutationKey: ['delete-product'],
        mutationFn: deleteProduct,
        onSuccess: () => navigate({ to: "/dashboard/inventory", replace: true })
    })

    return <div className="container mx-auto py-4">
        <DataTable
            columns={columns}
            data={data ?? []}
            filterBy="name"
            insertForm={<InsertProductForm />}
            onDelete={mutate}
        />
    </div>
}





