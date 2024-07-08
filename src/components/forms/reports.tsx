import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
    descValidations, qsTypeValidators,
} from "@/components/forms/validators";
import { InputField, SelectField, SubmitForm, TextAreaField, } from "@/components/forms/fields";
// shadcn
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreateReport } from "@/queries/reports";
import { z } from "zod";
import { REPORT_TYPES } from "@/constants";
import { ReportType } from "@/api/report";

export function InsertReportForm() {
    const { mutateAsync: createReport } = useCreateReport()

    const form = useForm({
        defaultValues: { desc: "", type: "", productId: 0 },
        onSubmit: async ({ value }) => createReport(value),
        validatorAdapter: zodValidator,
    });

    return (
        <ScrollArea className="max-h-[80vh]">
            <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }} >
                <div className="grid gap-4 p-1">
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

                    {/* TYPE */}
                    <form.Field
                        name="type"
                        validators={{
                            onChange: z.nativeEnum(ReportType),
                            onChangeAsyncDebounceMs: 500
                        }}
                        children={(field) =>
                            <SelectField
                                name="Tipo de Reporte"
                                items={REPORT_TYPES}
                                field={field}
                                required
                            />
                        }
                    />

                    {/* PRODUCT */}
                    <form.Field
                        name="productId"
                        validators={{
                            onChange: z.coerce.number(),
                            onChangeAsyncDebounceMs: 500
                        }}
                        children={(field) =>
                            <InputField
                                name="Id de Producto"
                                type="number"
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

