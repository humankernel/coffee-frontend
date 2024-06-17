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

export async function getProducts(): Promise<Product[]> {
  return api.get("/products");
}
