import { api } from "@/api";
import { removeEmptyValues } from "@/lib/utils";

export enum QsType {
    complaint = "complaint",
    suggestion = "suggestion",
}

export type QS = {
    id: number;
    desc: string;
    createdAt: Date;
    type: QsType;
};

export async function getQs(): Promise<QS[]> {
    const { data } = await api.get("/qs");
    return data;
}

export async function insertQs(qs: Omit<QS, "id">): Promise<QS> {
    const { data } = await api.post("/qs", qs);
    return data;
}

export async function getQsById(id: number): Promise<QS> {
    const { data } = await api.get<QS>(`/qs/${id}`);
    return data;
}

export async function updateQs(id: number, qs: Partial<QS>): Promise<QS> {
    const qaToSend = removeEmptyValues(qs);
    console.log({ id, qaToSend });
    const { data } = await api.patch<QS>(`/qs/${id}`, qaToSend);
    return data;
}

export async function deleteQs(id: number): Promise<QS> {
    const { data } = await api.delete<QS>(`/qs/${id}`);
    return data;
}
