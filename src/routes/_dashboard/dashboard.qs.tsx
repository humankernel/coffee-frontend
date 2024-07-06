import { InsertCsForm } from "@/components/forms/qs";
import { columns } from "@/components/table/columns/cs";
import { DataTable } from "@/components/table/data-table";
import { csOptions, useDeleteCs } from "@/queries/complains";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard/qs")({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(csOptions),
    component: CsPage,
});

function CsPage() {
    const { data: css } = useSuspenseQuery(csOptions)
    const { mutate: deleteCsById } = useDeleteCs()

    return (
        <main className="container mx-auto py-4">
            <DataTable
                name="Quejas/Sugerencias"
                columns={columns}
                data={css ?? []}
                filterBy="desc"
                insertForm={<InsertCsForm />}
                onDelete={deleteCsById}
            />
        </main>
    );
}
