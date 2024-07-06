import { api } from "@/api";
import { removeEmptyValues } from "@/lib/utils";

export enum CsType {
    complaint = "complaint",
    suggestion = "suggestion",
}

export enum Status {
    resolved = "resolved",
    pending = "pending",
    rejected = "rejected",
}

export type CS = {
    id: number;
    desc: string;
    createdAt: Date;
    status: Status;
    type: CsType;
};

export async function getCs(): Promise<CS[]> {
    const { data } = await api.get("/qs");
    return data;
}

export async function createCs(qs: Omit<CS, "id">): Promise<CS> {
    const { data } = await api.post("/qs", qs);
    return data;
}

export async function getCsById(id: number): Promise<CS> {
    const { data } = await api.get<CS>(`/qs/${id}`);
    return data;
}

export async function updateCs(id: number, qs: Partial<CS>): Promise<CS> {
    const qaToSend = removeEmptyValues(qs);
    console.log({ id, qaToSend });
    const { data } = await api.patch<CS>(`/qs/${id}`, qaToSend);
    return data;
}

export async function deleteCs(id: number): Promise<CS> {
    const { data } = await api.delete<CS>(`/qs/${id}`);
    return data;
}
