import { api } from "@/api";
import { removeEmptyValues } from "@/lib/utils";
import { Search } from "@/routes/_public/store";

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
    sugar: boolean;
    temp: Temp;
    drinkType: string;
};

export async function getProducts(
    params: Search,
): Promise<(Product | Food | Drink)[]> {
    const { data } = await api.get("/products", { params });
    return data;
}

export async function deleteProduct(
    id: number,
): Promise<Product | Food | Drink> {
    const { data } = await api.delete<Product>(`/products/${id}`);
    return data;
}

export async function getProduct(id: number): Promise<Product | Food | Drink> {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
}

// FIX:
export async function insertProduct(
    product: Omit<Food | Drink, "id">,
): Promise<Food | Drink> {
    console.log("before-insert", product)
    const productToSend = removeEmptyValues(product);
    if (product.price) productToSend.price = Number(product.price);
    console.log("before-insert", productToSend)

    if (product.type === ProductType.food) {
        productToSend.ingredients = product.ingredients.split(",");
        const { data } = await api.post<Food>("/products/food", product);
        return data;
    }

    if (product.type === ProductType.drink) {
        productToSend.sugar = false;
        console.log("before-insert", productToSend)
        const { data } = await api.post<Drink>("/products/drink", product);
        return data;
    }

    throw new Error("type does not exists");
}

// FIX:
export async function updateProduct(
    id: number,
    product: Partial<Drink | Food>,
) {
    const productToSend = removeEmptyValues(product);
    if (product.price) productToSend.price = Number(product.price);

    if (productToSend.type === ProductType.food) {
        productToSend.ingredients = product.ingredients.split(",");
        const { data } = await api.patch<Food>(
            `/products/food/${id}`,
            productToSend,
        );
        return data;
    }

    if (product.type === ProductType.drink) {
        productToSend.sugar = false;
        const { data } = await api.patch<Drink>(
            `/products/drink/${id}`,
            productToSend,
        );
        return data;
    }

    throw new Error("type does not exists");
}
