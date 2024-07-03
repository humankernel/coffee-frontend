import { api } from "@/api";
import { User } from "@/api/users";
import { sleep } from "@/lib/utils";
import { Search } from "@/routes/_public/store";

type Sale = {
    id: number;
    user: User;
    createdAt: Date;
};

type SaleRes = {
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

type Tiket = string;

export async function makeSale(
    userId: number,
    cart: { id: number; count: number }[],
): Promise<Tiket> {
    console.log({ userId, cart });

    const token = "CHANGE_THIS";

    const { data } = await api.post<Tiket>(
        `/sales`,
        { userId, cart }, // FIX: userId not needed if user logged in backend
        { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
}

export async function getSales(params?: Search): Promise<SaleRes[]> {
    const { data } = await api.get<SaleRes[]>("/sales", { params });
    return data;
}
