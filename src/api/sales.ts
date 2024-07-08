import { api } from "@/api";
import { User } from "@/api/users";
import { SearchParams } from "@/routes/_public/store";

export type Sale = {
    id: number;
    user: User;
    createdAt: Date;
};

export type SaleRes = {
    amount: number;
    sale: {
        id: number;
        createdAt: Date;
        user: {
            id: number;
            name: string;
            username: string;
        };
    };
    product: {
        id: number;
        name: string;
        price: number;
    };
};

export async function createSale({
    userId,
    products,
}: {
    userId: number;
    products: { id: number; amount: number }[];
}): Promise<any> {
    const token = "CHANGE_THIS";

    const { data } = await api.post(
        `/sales`,
        { userId, products },
        { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
}

export async function getSales(params?: SearchParams): Promise<SaleRes[]> {
    const { data } = await api.get<SaleRes[]>("/sales", { params });
    return data;
}
