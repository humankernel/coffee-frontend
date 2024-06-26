import { api } from "@/api";

export enum ProductType {
  menu = "menu",
  raw = "raw",
}

export type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  type: ProductType;
};

export type Food = Product & {
  foodType: string;
  ingredients: string[];
};

enum Size {
  sm = "sm",
  md = "md",
  lg = "lg",
}

enum Temp {
  cold = "cold",
  hot = "hot",
}

export type Drink = Product & {
  size: Size;
  sugar: boolean;
  temp: Temp;
  drinkType: string;
};

export async function getProducts(): Promise<Product[]> {
  return api.get("/products");
}

export async function deleteProduct(id: number): Promise<Product> {}

export async function insertProduct(
  product: Omit<Product, "id">,
): Promise<Product> {}
