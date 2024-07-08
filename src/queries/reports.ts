import {
    createReport,
    deleteReport,
    getReportById,
    getReports,
} from "@/api/report";
import {
    queryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const reportsOptions = queryOptions({
    queryKey: ["reports"],
    queryFn: getReports,
});

export function useReport(id: number) {
    return useQuery({
        queryKey: ["reports", id],
        queryFn: () => getReportById(id),
    });
}

export function useCreateReport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createReport,
        onSuccess: (data) => {
            toast.success(`Reporte ${data.id} correctamente insertado`);
            queryClient.invalidateQueries({
                queryKey: ["reports"],
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError)
                toast.error(error.response?.data.message);
            else toast.error("Error al insertar el Reporte");
        },
    });
}

export function useDeleteReport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteReport,
        onSuccess: (data) => {
            toast.success(`Reporte ${data.id} correctamente eliminado`);
            queryClient.invalidateQueries({
                queryKey: ["reports"],
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError)
                toast.error(error.response?.data.message);
            else toast.error("Error al eliminar el Reporte");
        },
    });
}
