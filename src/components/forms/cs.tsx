import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
    descValidations, qsTypeValidators, statusValidators,
} from "@/components/forms/validators";
import { SelectField, SubmitForm, TextAreaField, } from "@/components/forms/fields";
import { QSS, STATUS } from "@/constants";
import { useCreateCs, useCs, useUpdateCs } from "@/queries/cs";
// shadcn
import { ScrollArea } from "@/components/ui/scroll-area";

export function InsertCsForm() {
    const { mutateAsync: createCs } = useCreateCs()

    const form = useForm({
        defaultValues: { desc: "", type: "" },
        onSubmit: async ({ value }) => createCs(value),
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
                        validators={qsTypeValidators}
                        children={(field) =>
                            <SelectField
                                name="Queja o Sugerencia"
                                items={QSS}
                                field={field}
                                placeholder="queja/sugerencia"
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

export function UpdateCsForm({ id }: { id: number }) {
    const { data: cs } = useCs(id)
    const { mutateAsync: updateCsById } = useUpdateCs()

    const form = useForm({
        defaultValues: { status: cs?.status },
        onSubmit: async ({ value }) => updateCsById({ id, cs: value }),
        validatorAdapter: zodValidator,
    });

    return (
        <ScrollArea className="max-h-[60vh]">
            <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }} >
                <div className="grid gap-2 p-1">
                    {/* STATUS */}
                    <form.Field
                        name="status"
                        validators={statusValidators}
                        children={(field) =>
                            <SelectField
                                name="Estado"
                                items={STATUS}
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
