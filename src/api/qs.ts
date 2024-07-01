import { api } from "@/api";

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

export async function deleteQs(id: number): Promise<QS> {
  const { data } = await api.delete<QS>(`/qs/${id}`);
  return data;
}

export async function insertQs(qs: Omit<QS, "id">): Promise<QS> {
  console.log("insert-qs", { qs });
  const { data } = await api.post("/qs", qs);
  return data;
}

export async function getQsById(id: number): Promise<QS> {
  const { data } = await api.get<QS>(`/qs/${id}`);
  return data;
}

export async function updateQs(id: number, qs: Partial<QS>): Promise<QS> {
  const { data } = await api.patch<QS>(`/qs/${id}`, qs);
  return data;
}
