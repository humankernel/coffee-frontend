import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { InputField, SelectField, SubmitForm, TextAreaField, } from "@/components/forms/fields";
// shadcn
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreateOrder, useUpdateOrder } from "@/queries/orders";
import { z } from "zod";
import { ORDER_STATUS_TYPES } from "@/constants";

export function InsertOrderForm() {
    const { mutateAsync: createOrder } = useCreateOrder()

    const form = useForm({
        defaultValues: { supplier: "", products: "" },
        onSubmit: async ({ value }) => createOrder(value),
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
                    {/* SUPPLIER */}
                    <form.Field
                        name="supplier"
                        validators={{
                            onChange: z.coerce.number(),
                            onChangeAsyncDebounceMs: 500
                        }}
                        children={(field) => (
                            <InputField
                                name="Id Proveedor"
                                type="number"
                                field={field}
                                placeholder="1"
                                required
                            />
                        )}
                    />

                    {/* PRODUCTS */}
                    <form.Field
                        name="products"
                        validators={{
                            onChange: z.string(),
                            onChangeAsyncDebounceMs: 500
                        }}
                        children={(field) =>
                            <TextAreaField
                                name="Productos"
                                field={field}
                                placeholder="azucar, chocolate, cafe"
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

export function UpdateOrderForm() {
    const { mutateAsync: updateOrder } = useUpdateOrder()

    const form = useForm({
        defaultValues: { status: "" },
        onSubmit: async ({ value }) => updateOrder(value),
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
                    {/* STATUS */}
                    <form.Field
                        name="status"
                        validators={{
                            onChange: z.coerce.number(),
                            onChangeAsyncDebounceMs: 500
                        }}
                        children={(field) => (
                            <SelectField
                                name="Id Proveedor"
                                items={ORDER_STATUS_TYPES}
                                field={field}
                            />
                        )}
                    />
                </div>
                <SubmitForm form={form} />
            </form>
        </ScrollArea>
    );
}
