import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
    descValidations, qsTypeValidators,
} from "@/components/forms/validators";
import { SelectField, SubmitForm, TextAreaField, } from "@/components/forms/fields";
import { QS, getQsById, insertQs, updateQs } from "@/api/qs";
// shadcn
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QSS } from "@/constants";

export function InsertQsForm() {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationKey: ["insert-qs"],
        mutationFn: (values: QS) => insertQs(values),
        onSuccess: () => {
            toast.success("Queja o sugerencia insertado correctamente");
            queryClient.invalidateQueries({ queryKey: ["qs"] });
        },
        onError: () => toast.error("Error al insertar la queja o sugerencia"),
    });

    const form = useForm({
        defaultValues: { desc: "", type: "" },
        onSubmit: async ({ value }) => mutateAsync(value),
        validatorAdapter: zodValidator,
    });

    return (
        <ScrollArea className="max-h-[80vh] p-1">
            <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }} >
                <div className="grid w-full items-center gap-4 p-1">
                    {/* DESC */}
                    <form.Field
                        name="desc"
                        validators={descValidations}
                        children={(field) => (
                            <TextAreaField
                                name="Descripcion"
                                field={field}
                                placeholder="..."
                                required
                            />
                        )}
                    />

                    {/* Type */}
                    <form.Field
                        name="type"
                        validators={qsTypeValidators}
                        children={(field) =>
                            <SelectField
                                name="Queja o Sugerencia"
                                items={QSS}
                                field={field}
                                required
                            />
                        }
                    />
                </div>
                <SubmitForm form={form} />
            </form>
        </ScrollArea>
    );
}

export function UpdateQsForm({ id }: { id: number }) {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: [id, "qs"],
        queryFn: async () => getQsById(id),
    });

    const { mutateAsync } = useMutation({
        mutationKey: [id, "update-qs"],
        mutationFn: (value: Partial<QS>) => updateQs(id, value),
        onSuccess: () => {
            toast.success("Queja o Sugerencia correctamente actualizada");
            queryClient.invalidateQueries({ queryKey: ["qs"] });
        },
        onError: () => toast.error("Error al actualizar la queja o sugerencia"),
    });

    const form = useForm({
        defaultValues: { desc: "", type: "" },
        onSubmit: async ({ value }) => mutateAsync(value),
        validatorAdapter: zodValidator,
    });

    return (
        <ScrollArea className="max-h-[60vh] p-1">
            <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }} >
                <div className="grid w-full items-center gap-2 p-1">
                    {/* DESC */}
                    <form.Field
                        name="desc"
                        validators={descValidations}
                        children={(field) => (
                            <TextAreaField
                                name="Descripcion"
                                field={field}
                                placeholder={data?.desc ?? ""}
                            />
                        )}
                    />

                    {/* Type */}
                    <form.Field
                        name="type"
                        validators={qsTypeValidators}
                        children={(field) =>
                            <SelectField
                                name="Queja o Sugerencia"
                                items={QSS}
                                field={field}
                            />
                        }
                    />
                </div>
                <SubmitForm form={form} />
            </form>
        </ScrollArea>
    );
}
