import { InsertReportForm } from "@/components/forms/reports";
import { columns } from "@/components/table/columns/reports";
import { DataTable } from "@/components/table/data-table";
import { reportsOptions, useDeleteReport } from "@/queries/reports";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard/reports")({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(reportsOptions),
    component: ReportsPage,
});

function ReportsPage() {
    const { data: reports } = useSuspenseQuery(reportsOptions)
    const { mutate: deleteReportById } = useDeleteReport()

    return (
        <main className="container mx-auto py-4">
            <DataTable
                name="Reporte"
                columns={columns}
                data={reports}
                filterBy="desc"
                insertForm={<InsertReportForm />}
                onDelete={deleteReportById}
            />
        </main>
    );
}
