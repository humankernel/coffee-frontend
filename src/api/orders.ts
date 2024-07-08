import { api } from "@/api";

export enum OrderStatus {
    pending = "pending",
    rejected = "rejected",
    fullfiled = "fullfiled",
}

export type PurchaseOrder = {
    id: number;
    createdAt: Date;
    status: OrderStatus;
    supplier: number;
    products: string[];
};

export async function getOrders(): Promise<PurchaseOrder[]> {
    const { data } = await api.get("/purchase-orders");
    return data;
}

export async function createOrder(
    order: Omit<PurchaseOrder, "id">,
): Promise<PurchaseOrder> {
    const { data } = await api.post("/purchase-orders", order);
    return data;
}

export async function getOrderById(id: number): Promise<PurchaseOrder> {
    const { data } = await api.get<PurchaseOrder>(`/purchase-orders/${id}`);
    return data;
}

export async function deleteOrder(id: number): Promise<PurchaseOrder> {
    const { data } = await api.delete<PurchaseOrder>(`/purchase-orders/${id}`);
    return data;
}

export async function updateOrder(
    order: PurchaseOrder,
): Promise<PurchaseOrder> {
    const { data } = await api.patch<PurchaseOrder>(
        `/purchase-orders/${order.id}`,
        order,
    );
    return data;
}
