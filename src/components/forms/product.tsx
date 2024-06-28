import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { getProduct, insertProduct, updateProduct } from "@/api/products"
import { descValidations, drinkValidators, foodTypeValidators, ingredientsValidators, nameValidations, priceValidators, sizeValidators, sugarValidators, tempValidators } from "@/components/forms/validators"
import { DescField, DrinkTypeField, FoodTypeField, IngredientsField, NameField, PriceField, SizeField, SugarField, TempField } from "@/components/forms/fields"

// shadcn
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function InsertProductForm() {
    const queryClient = useQueryClient();

    const [type, setType] = useState("food");

    const { mutateAsync } = useMutation({
        mutationKey: ['insert-product'],
        mutationFn: (values: any) => insertProduct({ ...values, type }),
        onSuccess: () => {
            toast.success("Producto insertado correctamente")
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
        onError: () => toast.error("Error al insertar el Producto"),
    })

    const form = useForm({
        defaultValues: {
            name: '', desc: '', price: '', food_type: '',
            ingredients: '', size: '', sugar: '', temp: '', drink_type: ''
        },
        onSubmit: async ({ value }) => { return mutateAsync(value) },
        validatorAdapter: zodValidator
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }} >
            <ScrollArea className="h-[60vh] p-2">
                <div className="grid w-full items-center gap-4">
                    {/* NAME */}
                    <form.Field
                        name="name"
                        validators={nameValidations}
                        children={(field) =>
                            <NameField field={field} placeholder='Mocka' />
                        }
                    />

                    {/* DESC */}
                    <form.Field
                        name="desc"
                        validators={descValidations}
                        children={(field) =>
                            <DescField field={field} placeholder='...' />
                        }
                    />

                    {/* PRICE */}
                    <form.Field
                        name="price"
                        validators={priceValidators}
                        children={(field) =>
                            <PriceField field={field} placeholder='17.50' />
                        }
                    />

                    {/* TYPE */}
                    <Tabs value={type} onValueChange={(v) => setType(v)}>
                        <TabsList>
                            <TabsTrigger value="food">Comida</TabsTrigger>
                            <TabsTrigger value="drink">Bebida</TabsTrigger>
                            <TabsTrigger value="raw">En Bruto</TabsTrigger>
                        </TabsList>
                        <TabsContent value="food">
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* FOOD TYPE */}
                                <form.Field
                                    name="food_type"
                                    validators={foodTypeValidators}
                                    children={(field) =>
                                        <FoodTypeField field={field} placeholder='' />
                                    }
                                />
                                {/* FOOD INGREDIENTS */}
                                <form.Field
                                    name="ingredients"
                                    validators={ingredientsValidators}
                                    children={(field) =>
                                        <IngredientsField field={field} placeholder='' />
                                    }
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="drink">
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* DRINK SIZE */}
                                <form.Field
                                    name="size"
                                    validators={sizeValidators}
                                    children={(field) =>
                                        <SizeField field={field} placeholder='sm' />
                                    }
                                />

                                {/* DRINK SUGAR */}
                                <form.Field
                                    name="sugar"
                                    validators={sugarValidators}
                                    children={(field) =>
                                        <SugarField field={field} placeholder='' />
                                    }
                                />

                                {/* DRINK TEMP */}
                                <form.Field
                                    name="temp"
                                    validators={tempValidators}
                                    children={(field) =>
                                        <TempField field={field} placeholder='' />
                                    }
                                />

                                {/* DRINK TYPE */}
                                <form.Field
                                    name="drink_type"
                                    validators={drinkValidators}
                                    children={(field) =>
                                        <DrinkTypeField field={field} placeholder='cafe' />
                                    }
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="raw">RAW</TabsContent>
                    </Tabs>

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



export function UpdateProductForm({ id }: { id: number }) {
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: [id, 'products'],
        queryFn: async () => getProduct(id)
    })

    const { mutateAsync } = useMutation({
        mutationKey: [id, 'update-product'],
        mutationFn: (value: any) => updateProduct(id, { ...value, type: data?.type }),
        onSuccess: () => {
            toast.success("Usuario actualizado correctamente")
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
        onError: () => toast.error("Error al actualizar el producto")
    })

    const form = useForm({
        defaultValues: {
            name: '', desc: '', price: '', food_type: '',
            ingredients: '', size: '', sugar: '', temp: '', drink_type: ''
        },
        onSubmit: async ({ value }) => { return mutateAsync(value) },
        validatorAdapter: zodValidator
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }} >
            <ScrollArea className="h-[60vh] p-2">
                <div className="grid w-full items-center gap-4">
                    {/* NAME */}
                    <form.Field
                        name="name"
                        validators={nameValidations}
                        children={(field) =>
                            <NameField field={field} placeholder={data?.name ?? 'Mocka'} />
                        }
                    />

                    {/* DESC */}
                    <form.Field
                        name="desc"
                        validators={descValidations}
                        children={(field) =>
                            <DescField field={field} placeholder={data?.desc ?? ".."} />
                        }
                    />

                    {/* PRICE */}
                    <form.Field
                        name="price"
                        validators={priceValidators}
                        children={(field) =>
                            <PriceField field={field} placeholder={data?.price?.toString() ?? '17.50'} />
                        }
                    />

                    {/* TYPE */}
                    <Tabs value={data?.type ?? 'food'} >
                        <TabsList>
                            <TabsTrigger value="food">Comida</TabsTrigger>
                            <TabsTrigger value="drink">Bebida</TabsTrigger>
                            <TabsTrigger value="raw">En Bruto</TabsTrigger>
                        </TabsList>
                        <TabsContent value="food">
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* FOOD TYPE */}
                                <form.Field
                                    name="food_type"
                                    validators={foodTypeValidators}
                                    children={(field) =>
                                        <FoodTypeField field={field} placeholder={data?.foodType ?? ""} />
                                    }
                                />
                                {/* FOOD INGREDIENTS */}
                                <form.Field
                                    name="ingredients"
                                    validators={ingredientsValidators}
                                    children={(field) =>
                                        <IngredientsField field={field} placeholder={data?.ingredients ?? ""} />
                                    }
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="drink">
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* DRINK SIZE */}
                                <form.Field
                                    name="size"
                                    validators={sizeValidators}
                                    children={(field) =>
                                        <SizeField field={field} placeholder={data?.size ?? ""} />
                                    }
                                />

                                {/* DRINK SUGAR */}
                                <form.Field
                                    name="sugar"
                                    validators={sugarValidators}
                                    children={(field) =>
                                        <SugarField field={field} placeholder={data?.sugar ?? ""} />
                                    }
                                />

                                {/* DRINK TEMP */}
                                <form.Field
                                    name="temp"
                                    validators={tempValidators}
                                    children={(field) =>
                                        <TempField field={field} placeholder={data?.temp ?? ""} />
                                    }
                                />

                                {/* DRINK TYPE */}
                                <form.Field
                                    name="drink_type"
                                    validators={drinkValidators}
                                    children={(field) =>
                                        <DrinkTypeField field={field} placeholder={data?.drinkType ?? ""} />
                                    }
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="raw">RAW</TabsContent>
                    </Tabs>
                </div>
            </ScrollArea>
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
        </form >
    )
}
