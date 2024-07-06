import {
    queryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    Drink,
    Food,
    deleteProductById,
    getProductById,
    getProducts,
    insertProduct,
    updateProductById,
} from "@/api/products";
import { SearchParams, Sort } from "@/routes/_public/store";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const productsOptions = (deps: SearchParams) =>
    queryOptions({
        queryKey: ["products", deps],
        queryFn: () => getProducts(deps),
        enabled: !!deps,
    });

export const productOptions = (id: number) =>
    queryOptions({
        queryKey: ["products", id],
        queryFn: () => getProductById(id),
        enabled: !!id,
    });

export function useProducts(params: SearchParams) {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => getProducts(params),
    });
}

export function useProduct(id: number) {
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => getProductById(id),
        enabled: !!id,
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: insertProduct,
        onSuccess: (data) => {
            toast.success(`Producto ${data.name} correctamente insertado`);
            queryClient.invalidateQueries({
                queryKey: ["products", { sort: Sort.newest }],
            });
        },
        onError: (error) => {
            toast.error("Error al insertar el producto");
            if (error instanceof AxiosError)
                toast.error("Error al insertar el producto\n");
        },
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, product }: { id: number; product: Drink | Food }) =>
            updateProductById(id, product),
        onSuccess: (data) => {
            toast.success(`Producto ${data.name} correctamente actualizado`);
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            toast.error("Error al actualizar el producto");
            if (error instanceof AxiosError)
                toast.error("Error al actualizar el producto\n");
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient(); // FIX: better way?

    return useMutation({
        mutationFn: deleteProductById,
        onSuccess: (data) => {
            toast.success(`Producto ${data.name} correctamente eliminado`);
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            toast.error("Error al eliminar el producto");
            if (error instanceof AxiosError)
                toast.error("Error al eliminar el producto\n");
        },
    });
}
