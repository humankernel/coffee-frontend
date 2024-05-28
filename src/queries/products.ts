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
  const products = [
    { id: 1, name: "assa", desc: "", price: 12.0, type: ProductType.menu },
    { id: 2, name: "strange", desc: "", price: 12.0, type: ProductType.menu },
    { id: 3, name: "culo", desc: "", price: 12.0, type: ProductType.menu },
    { id: 4, name: "product1", desc: "", price: 12.0, type: ProductType.menu },
    { id: 5, name: "product1", desc: "", price: 12.0, type: ProductType.menu },
  ];
  return products;
}
