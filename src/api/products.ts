import { api } from "@/api";
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

export async function insertFood(food: Omit<Food, "id">): Promise<Food> {
    const { data } = await api.post<Food>("/products/food", food);
    return data;
}

export async function insertDrink(drink: Omit<Drink, "id">): Promise<Drink> {
    const { data } = await api.post<Drink>("/products/drink", drink);
    return data;
}

export async function updateFood(
    id: number,
    food: Omit<Food, "id">,
): Promise<Food> {
    const { data } = await api.patch<Food>(`/products/food/${id}`, food);
    return data;
}

export async function updateDrink(
    id: number,
    drink: Omit<Drink, "id">,
): Promise<Drink> {
    const { data } = await api.patch<Drink>(`/products/drink/${id}`, drink);
    return data;
}
