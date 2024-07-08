import { api } from "@/api";

export enum ReportType {
    missing = "missing",
    surplus = "surplus",
}

export type Report = {
    id: number;
    desc: string;
    createdAt: Date;
    type: ReportType;
    productId: number;
};

export type ReportResponse = {
    id: number;
    desc: string;
    createdAt: Date;
    type: ReportType;
    product: { id: number };
};

export async function getReports(): Promise<ReportResponse[]> {
    const { data } = await api.get<ReportResponse[]>("/reports");
    return data;
}

export async function createReport(
    report: Omit<Report, "id">,
): Promise<Report> {
    const { data } = await api.post("/reports", report);
    return data;
}

export async function getReportById(id: number): Promise<Report> {
    const { data } = await api.get<Report>(`/reports/${id}`);
    return data;
}

export async function deleteReport(id: number): Promise<Report> {
    const { data } = await api.delete<Report>(`/reports/${id}`);
    return data;
}
