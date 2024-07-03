import { deleteQs, getQs } from "@/api/qs";
import { InsertQsForm } from "@/components/forms/qs";
import { columns } from "@/components/table/columns/qs";
import { DataTable } from "@/components/table/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_dashboard/dashboard/qs")({
    component: QsPage,
});

function QsPage() {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["qs"],
        queryFn: getQs,
    });

    const { mutate } = useMutation({
        mutationKey: ["delete-qs"],
        mutationFn: deleteQs,
        onSuccess: () => {
            toast.success("Queja o Sugerencia correctamente eliminado");
            queryClient.invalidateQueries({ queryKey: ["qs"] });
        },
        onError: () => toast.error("Error al eliminar una queja o sugerencia"),
    });

    return (
        <main className="container mx-auto py-4">
            <DataTable
                name="Quejas/Sugerencias"
                columns={columns}
                data={data ?? []}
                filterBy="desc"
                insertForm={<InsertQsForm />}
                onDelete={mutate}
            />
        </main>
    );
}
