import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ProductType, getProduct, insertProduct, updateProduct } from "@/api/products";
import {
    descValidations,
    drinkValidators,
    foodTypeValidators,
    ingredientsValidators,
    nameValidations,
    priceValidators,
    sizeValidators,
    sugarValidators,
    tempValidators,
} from "@/components/forms/validators";
import {
    TextAreaField,
    MultiSelectField,
    InputField,
    SelectField,
    SubmitForm,
} from "@/components/forms/fields";
import { useState } from "react";

// shadcn
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { INGREDIENTS, SIZES, TEMPS } from "@/constants";
import { Sort } from "@/routes/_public/store";

export function InsertProductForm() {
    const [type, setType] = useState(ProductType.food);
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationKey: ["insert-product"],
        mutationFn: (values: any) => insertProduct({ ...values, type }),
        onSuccess: () => {
            toast.success("Producto insertado correctamente");
            queryClient.invalidateQueries({ queryKey: [{ sort: Sort.newest }, "products"] });
        },
        onError: () => toast.error("Error al insertar el Producto"),
    });

    const form = useForm({
        defaultValues: {
            name: "", desc: "", price: "", food_type: "", ingredients: "",
            size: "", sugar: "", temp: "", drink_type: "",
        },
        onSubmit: async ({ value }) => mutateAsync(value),
        validatorAdapter: zodValidator,
    });

    return (
        <ScrollArea className="max-h-[80vh] p-2">
            <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }} >
                <div className="grid w-full items-center gap-4 p-1">
                    {/* NAME */}
                    <form.Field
                        name="name"
                        validators={nameValidations}
                        children={(field) => (
                            <div className="grid gap-2">
                                <InputField
                                    name="Nombre"
                                    type="text"
                                    field={field}
                                    placeholder="Cafe Mocca"
                                    required
                                />
                            </div>
                        )}
                    />

                    {/* DESC */}
                    <form.Field
                        name="desc"
                        validators={descValidations}
                        children={(field) => (
                            <div className="grid gap-2">
                                <TextAreaField
                                    name="Descripcion"
                                    field={field}
                                    placeholder="..."
                                    required
                                />
                            </div>
                        )}
                    />

                    {/* PRICE */}
                    <form.Field
                        name="price"
                        validators={priceValidators}
                        children={(field) => (
                            <InputField
                                name="Precio"
                                type="number"
                                field={field}
                                placeholder="17.50"
                                required
                            />
                        )}
                    />

                    {/* TYPE */}
                    <Tabs value={type} onValueChange={(v) => setType(v)}>
                        <TabsList>
                            <TabsTrigger value="food">Comida</TabsTrigger>
                            <TabsTrigger value="drink">Bebida</TabsTrigger>
                        </TabsList>
                        <TabsContent value="food">
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* FOOD TYPE */}
                                <form.Field
                                    name="food_type"
                                    validators={foodTypeValidators}
                                    children={(field) => (
                                        <InputField
                                            name="Tipo de Comida"
                                            field={field}
                                            placeholder=""
                                            required
                                        />
                                    )}
                                />
                                {/* FOOD INGREDIENTS */}
                                <form.Field
                                    name="ingredients"
                                    validators={ingredientsValidators}
                                    children={(field) => (
                                        <MultiSelectField
                                            name="Ingredientes"
                                            field={field}
                                            items={INGREDIENTS}
                                            placeholder="Azucar, Helado, ..."
                                        />
                                    )}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="drink">
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* DRINK SIZE */}
                                <form.Field
                                    name="size"
                                    validators={sizeValidators}
                                    children={(field) => (
                                        <SelectField
                                            name="Tamaño"
                                            items={SIZES}
                                            field={field}
                                            placeholder="sm, md, lg"
                                            required
                                        />
                                    )}
                                />

                                {/* DRINK TEMP */}
                                <form.Field
                                    name="temp"
                                    validators={tempValidators}
                                    children={(field) => (
                                        <SelectField
                                            name="Temperatura"
                                            items={TEMPS}
                                            field={field}
                                            required
                                        />
                                    )}
                                />

                                {/* DRINK TYPE */}
                                <form.Field
                                    name="drink_type"
                                    validators={drinkValidators}
                                    children={(field) => (
                                        <InputField
                                            name="Tipo de Bebida"
                                            field={field}
                                            placeholder="cafe"
                                            required
                                        />
                                    )}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
                <SubmitForm form={form} />
            </form>
        </ScrollArea>
    );
}

export function UpdateProductForm({ id }: { id: number }) {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: [id, "products"],
        queryFn: async () => getProduct(id),
    });

    const { mutateAsync } = useMutation({
        mutationKey: [id, "update-product"],
        mutationFn: (value: unknown) =>
            updateProduct(id, { ...value, type: data?.type }),
        onSuccess: () => {
            toast.success("Producto actualizado correctamente");
            queryClient.invalidateQueries({ queryKey: [{ sort: Sort.newest }, "products"] });
        },
        onError: () => toast.error("Error al actualizar el producto"),
    });

    const form = useForm({
        defaultValues: {
            name: "", desc: "", price: "", food_type: "", ingredients: "",
            size: "", sugar: "", temp: "", drink_type: "",
        },
        onSubmit: async ({ value }) => mutateAsync(value),
        validatorAdapter: zodValidator,
    });

    return (
        <ScrollArea className="max-h-[80vh] p-2">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <div className="grid w-full items-center gap-4 p-1">
                    {/* NAME */}
                    <form.Field
                        name="name"
                        validators={nameValidations}
                        children={(field) => (
                            <InputField
                                name="Nombre"
                                type="text"
                                field={field}
                                placeholder={data?.name ?? "Cafe Mocca"}
                            />
                        )}
                    />

                    {/* DESC */}
                    <form.Field
                        name="desc"
                        validators={descValidations}
                        children={(field) => (
                            <TextAreaField
                                name="Descripcion"
                                field={field}
                                placeholder={data?.desc ?? ".."}
                            />
                        )}
                    />

                    {/* PRICE */}
                    <form.Field
                        name="price"
                        validators={priceValidators}
                        children={(field) => (
                            <InputField
                                name="Precio"
                                field={field}
                                placeholder={data?.price?.toString() ?? "$17.50"}
                            />
                        )}
                    />

                    {/* TYPE */}
                    <Tabs value={data?.type ?? "food"}>
                        <TabsList>
                            <TabsTrigger value="food">Comida</TabsTrigger>
                            <TabsTrigger value="drink">Bebida</TabsTrigger>
                        </TabsList>
                        <TabsContent value="food">
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* FOOD TYPE */}
                                <form.Field
                                    name="food_type"
                                    validators={foodTypeValidators}
                                    children={(field) => (
                                        <InputField
                                            name="Tipo de Comida"
                                            field={field}
                                            placeholder={""}
                                        />
                                    )}
                                />
                                {/* FOOD INGREDIENTS */}
                                <form.Field
                                    name="ingredients"
                                    validators={ingredientsValidators}
                                    children={(field) => (
                                        <MultiSelectField
                                            name="Ingredientes"
                                            field={field}
                                            items={INGREDIENTS}
                                            placeholder="Azucar, Helado, ..."
                                        />
                                    )}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="drink">
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* DRINK SIZE */}
                                <form.Field
                                    name="size"
                                    validators={sizeValidators}
                                    children={(field) => (
                                        <SelectField
                                            name="Tamaño"
                                            items={SIZES}
                                            field={field}
                                        />
                                    )}
                                />

                                {/* DRINK SUGAR */}
                                <form.Field
                                    name="sugar"
                                    validators={sugarValidators}
                                    children={(field) => (
                                        <InputField
                                            name="Azucar"
                                            type="checkbox"
                                            field={field}
                                            placeholder=""
                                        />
                                    )}
                                />

                                {/* DRINK TEMP */}
                                <form.Field
                                    name="temp"
                                    validators={tempValidators}
                                    children={(field) => (
                                        <SelectField
                                            name="Temperatura"
                                            items={TEMPS}
                                            field={field}
                                        />
                                    )}
                                />

                                {/* DRINK TYPE */}
                                <form.Field
                                    name="drink_type"
                                    validators={drinkValidators}
                                    children={(field) => (
                                        <InputField
                                            name="Tipo de Bebida"
                                            field={field}
                                        />
                                    )}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
                <SubmitForm form={form} />
            </form>
        </ScrollArea>
    );
}
