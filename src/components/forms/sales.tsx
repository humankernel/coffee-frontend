import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { InputField, SubmitForm, } from "@/components/forms/fields";
// shadcn
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { useCreateSale } from "@/queries/sales";

export function InsertSaleForm() {
    const { mutateAsync: createSale } = useCreateSale()

    const form = useForm({
        defaultValues: { userId: 0, productId: 0, amount: 0 },
        onSubmit: async ({ value }) => {
            const { userId, productId, amount } = value
            const products = [{ id: productId, amount }]
            await createSale({ userId, products })
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
                        validators={{
                            onChange: z.coerce.number(),
                            onChangeAsyncDebounceMs: 500
                        }}
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
                        validators={{
                            onChange: z.coerce.number(),
                            onChangeAsyncDebounceMs: 500
                        }}
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
                        validators={{
                            onChange: z.coerce.number(),
                            onChangeAsyncDebounceMs: 500
                        }}
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

