import {
    queryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    deleteProductById,
    getProductById,
    getProducts,
    insertProduct,
    updateProductById,
} from "@/api/products";
import { SearchParams, Sort } from "@/routes/_public/store";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const productsOptions = (params: SearchParams) =>
    queryOptions({
        queryKey: ["products", params],
        queryFn: () => getProducts(params),
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
            toast.success(`Producto ${data.id} correctamente insertado`);
            queryClient.invalidateQueries({
                queryKey: ["products", { sort: Sort.newest }],
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError)
                toast.error(error.response?.data.message);
            else toast.error("Error al insertar el producto");
        },
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProductById,
        onSuccess: (data) => {
            toast.success(`Producto ${data.id} correctamente actualizado`);
            queryClient.invalidateQueries({
                queryKey: ["products", { sort: Sort.newest }],
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError)
                toast.error(error.response?.data.message);
            else toast.error("Error al actualizar el producto");
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient(); // FIX: better way?

    return useMutation({
        mutationFn: deleteProductById,
        onSuccess: (data) => {
            toast.success(`Producto ${data.id} correctamente eliminado`);
            queryClient.invalidateQueries({
                queryKey: ["products", { sort: Sort.newest }],
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError)
                toast.error(error.response?.data.message);
            else toast.error("Error al eliminar el producto");
        },
    });
}
