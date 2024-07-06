import { api } from "@/api";
import { SearchParams } from "@/routes/_public/store";

export enum ProductType {
    food = "food",
    drink = "drink",
}

export type Product = {
    id: number;
    name: string;
    desc: string;
    price: number;
    type: ProductType;
    discount: number;
    stars: number;
    people: number;
    createdAt: Date;
};

export type Food = Product & {
    foodType: string;
    ingredients: string[];
};

export enum Size {
    sm = "sm",
    md = "md",
    lg = "lg",
}

export enum Temp {
    cold = "cold",
    hot = "hot",
}

export type Drink = Product & {
    size: Size;
    temp: Temp;
    drinkType: string;
};

export async function getProducts(
    params: SearchParams,
): Promise<(Food | Drink)[]> {
    const { data } = await api.get("/products", { params });
    return data;
}

export async function getProductById(id: number): Promise<Food | Drink> {
    const { data } = await api.get<Food | Drink>(`/products/${id}`);
    return data;
}

export async function deleteProductById(id: number): Promise<Food | Drink> {
    const { data: product } = await api.get<Product>(`/products/${id}`);

    if (product.type === ProductType.food) {
        const { data } = await api.delete<Food>(`/products/food/${id}`);
        return data;
    }
    if (product.type === ProductType.drink) {
        const { data } = await api.delete<Drink>(`/products/drink/${id}`);
        return data;
    }
}

export async function insertProduct(
    product: Omit<Food | Drink, "id">,
): Promise<Food | Drink> {
    if (product.type === ProductType.food) {
        const { data } = await api.post<Food>("/products/food", product);
        return data;
    }

    if (product.type === ProductType.drink) {
        const { data } = await api.post<Drink>("/products/drink", product);
        return data;
    }
}

export async function updateProductById(
    id: number,
    product: Omit<Food | Drink, "id">,
): Promise<Food | Drink> {
    if (product.type === ProductType.food) {
        const { data } = await api.patch<Food>(`/products/food/${id}`, food);
        return data;
    }
    if (product.type === ProductType.drink) {
        const { data } = await api.patch<Drink>(`/products/drink/${id}`, drink);
        return data;
    }
}
