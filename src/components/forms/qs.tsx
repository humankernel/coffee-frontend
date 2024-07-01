import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { descValidations, drinkValidators, foodTypeValidators, ingredientsValidators, nameValidations, priceValidators, qsTypeValidators, sizeValidators, sugarValidators, tempValidators } from "@/components/forms/validators"
import { DescField, DrinkTypeField, FoodTypeField, IngredientsField, NameField, PriceField, QsTypeField, SizeField, SugarField, TempField } from "@/components/forms/fields"
import { getQsById, insertQs, updateQs } from "@/api/qs"
// shadcn
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"


export function InsertQsForm() {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationKey: ['insert-qs'],
        mutationFn: (values: any) => insertQs(values),
        onSuccess: () => {
            toast.success("Queja o sugerencia insertado correctamente")
            queryClient.invalidateQueries({ queryKey: ["qs"] })
        },
        onError: () => toast.error("Error al insertar la queja o sugerencia"),
    })

    const form = useForm({
        defaultValues: { desc: '', type: '' },
        onSubmit: async ({ value }) => { return mutateAsync(value) },
        validatorAdapter: zodValidator
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }} >
            <ScrollArea className="max-h-[60vh] p-2">
                <div className="grid w-full items-center gap-4">
                    {/* DESC */}
                    <form.Field
                        name="desc"
                        validators={descValidations}
                        children={(field) =>
                            <DescField field={field} placeholder='...' />
                        }
                    />

                    {/* Type */}
                    <form.Field
                        name="type"
                        validators={qsTypeValidators}
                        children={(field) =>
                            <QsTypeField field={field} />
                        }
                    />
                </div>
                <div className="flex mt-10 justify-between">
                    <Button variant="outline">Cancelar</Button>
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button type="submit" size="sm" disabled={!canSubmit}>
                                {isSubmitting ? '...' : 'Aceptar'}
                            </Button>
                        )}
                    />
                </div>
            </ScrollArea>
        </form >
    )
}



export function UpdateQsForm({ id }: { id: number }) {
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: [id, 'qs'],
        queryFn: async () => getQsById(id)
    })

    const { mutateAsync } = useMutation({
        mutationKey: [id, 'update-qs'],
        mutationFn: (value: any) => updateQs(id, value),
        onSuccess: () => {
            toast.success("Queja o Sugerencia correctamente actualizada")
            queryClient.invalidateQueries({ queryKey: ["qs"] })
        },
        onError: () => toast.error("Error al actualizar la queja o sugerencia")
    })

    const form = useForm({
        defaultValues: { desc: '', type: '' },
        onSubmit: async ({ value }) => { return mutateAsync(value) },
        validatorAdapter: zodValidator
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }} >
            <ScrollArea className="max-h-[60vh] p-2">
                <div className="grid w-full items-center gap-4">
                    {/* DESC */}
                    <form.Field
                        name="desc"
                        validators={descValidations}
                        children={(field) =>
                            <DescField field={field} placeholder={data?.desc ?? ''} />
                        }
                    />

                    {/* Type */}
                    <form.Field
                        name="type"
                        validators={qsTypeValidators}
                        children={(field) =>
                            <QsTypeField field={field} />
                        }
                    />
                </div>
                <div className="flex mt-10 justify-between">
                    <Button variant="outline">Cancelar</Button>
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button type="submit" size="sm" disabled={!canSubmit}>
                                {isSubmitting ? '...' : 'Aceptar'}
                            </Button>
                        )}
                    />
                </div>
            </ScrollArea>
        </form >
    )
}
