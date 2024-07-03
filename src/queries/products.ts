import { queryOptions } from "@tanstack/react-query";
import { getProduct, getProducts } from "@/api/products";
import { Search } from "@/routes/_public/store";

export const productsOptions = (deps: Search) =>
    queryOptions({
        queryKey: [deps, "products"],
        queryFn: () => getProducts(deps),
    });

export const productOptions = (id: number) =>
    queryOptions({
        queryKey: [id, "products"],
        queryFn: () => getProduct(id),
    });
