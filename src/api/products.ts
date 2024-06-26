import { api } from "@/api";

export enum ProductType {
  food = "food",
  drink = "drink",
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

export type Raw = Product & {};

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get("/products");
  return data;
}

export async function deleteProduct(id: number): Promise<Product> {
  const { data } = await api.delete<Product>(`/products/${id}`);
  return data;
}

export async function insertProduct(
  product: Omit<Food, "id"> | Omit<Drink, "id"> | Omit<Raw, "id">,
): Promise<Food | Drink | Raw> {
  product = {
    ...product,
    price: Number(product.price),
  };

  if (product.type === "food") {
    product = {
      ...product,
      food_type: product.foodType,
      ingredients: product.ingredients.split(","),
    };
    const { data } = await api.post("/products/food", product);
    return data;
  }

  if (product.type === "drink") {
    product = {
      ...product,
      drink_type: product.drinkType,
    };

    const { data } = await api.post("/products/drink", product);
    return data;
  }

  if (product.type === "raw") {
    const { data } = await api.post("/products/raw", product);
    return data;
  }

  throw new Error("type does not exists");
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}
