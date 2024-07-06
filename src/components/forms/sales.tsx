import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
    descValidations,
} from "@/components/forms/validators";
import { InputField, SubmitForm, } from "@/components/forms/fields";
// shadcn
import { ScrollArea } from "@/components/ui/scroll-area";
import { createSale } from "@/api/sales";

export function InsertSaleForm() {
    const form = useForm({
        defaultValues: { userId: 0, productId: 0, amount: 0 },
        onSubmit: async ({ value }) => {
            const { userId, productId, amount } = value
            const product = [{ id: productId, amount }]
            createSale({ userId, product })
        },
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
                    {/* USERID */}
                    <form.Field
                        name="userId"
                        validators={descValidations}
                        children={(field) => (
                            <InputField
                                name="Id del Usuario"
                                type="number"
                                field={field}
                                placeholder="1"
                                required
                            />
                        )}
                    />

                    {/* PRODUCTID */}
                    <form.Field
                        name="productId"
                        validators={descValidations}
                        children={(field) => (
                            <InputField
                                name="Id del Producto"
                                type="number"
                                field={field}
                                placeholder="1"
                                required
                            />
                        )}
                    />

                    {/* CANTIDAD */}
                    <form.Field
                        name="amount"
                        validators={descValidations}
                        children={(field) => (
                            <InputField
                                name="Cantidad"
                                type="number"
                                field={field}
                                placeholder="1"
                                required
                            />
                        )}
                    />
                </div>
                <SubmitForm form={form} />
            </form>
        </ScrollArea>
    );
}

