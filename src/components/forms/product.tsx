import { useForm } from "@tanstack/react-form";
import { Drink, Food, ProductType, Size, Temp } from "@/api/products";
import {
    descValidations,
    drinkValidators,
    foodTypeValidators,
    ingredientsValidators,
    nameValidations,
    priceValidators,
    sizeValidators,
    tempValidators,
} from "@/components/forms/validators";
import { InputField, MultiSelectField, SelectField, SubmitForm, TextAreaField, } from "@/components/forms/fields";
import { useState } from "react";
import { INGREDIENTS, SIZES, TEMPS } from "@/constants";
import { removeEmptyValues } from "@/lib/utils";
import { useCreateProduct, useProduct, useUpdateProduct } from "@/queries/products";
// shadcn
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodValidator } from "@tanstack/zod-form-adapter";

export function CreateProductForm() {
    const [type, setType] = useState<ProductType>(ProductType.food);
    const { mutateAsync: createProduct } = useCreateProduct()

    const form = useForm({
        defaultValues: {
            name: "", desc: "", price: 0, stars: 0, people: 0, discount: 0,
            size: Size.sm, temp: Temp.hot, drinkType: "",
            foodType: "", ingredients: []
        },
        onSubmit: async ({ value }) => {
            const product = removeEmptyValues(value)
            product.type = type
            createProduct(product)
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
                    {/* NAME */}
                    <form.Field
                        name="name"
                        validators={nameValidations}
                        children={(field) => (
                            <div className="grid gap-2">
                                <InputField
                                    field={field}
                                    name="Nombre"
                                    placeholder="Cafe "
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
                                    field={field}
                                    name="Descripcion"
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
                            <div className="grid gap-2">
                                <InputField
                                    field={field}
                                    type="number"
                                    name="Precio"
                                    placeholder="4.49"
                                    required
                                />
                            </div>
                        )}
                    />

                    {/* TYPE */}
                    <Tabs value={type}
                        onValueChange={(v) => setType(v)}>
                        <TabsList>
                            <TabsTrigger value={ProductType.food}>Comida</TabsTrigger>
                            <TabsTrigger value={ProductType.drink}>Bebida</TabsTrigger>
                        </TabsList>
                        <TabsContent value={ProductType.food}>
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* FOOD INGREDIENTS */}
                                <form.Field
                                    name="ingredients"
                                    validators={ingredientsValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <MultiSelectField
                                                field={field}
                                                items={INGREDIENTS}
                                                name="Ingredientes"
                                                placeholder="Azucar, Helado, ..."
                                            />
                                        </div>
                                    )}
                                />

                                {/* FOOD TYPE */}
                                <form.Field
                                    name="foodType"
                                    validators={foodTypeValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <InputField
                                                field={field}
                                                name="Tipo de Comida"
                                                placeholder="Postre, Guarnición ,..."
                                                required
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value={ProductType.drink}>
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* DRINK SIZE */}
                                <form.Field
                                    name="size"
                                    validators={sizeValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <SelectField
                                                field={field}
                                                name="Tamaño"
                                                items={SIZES}
                                                required
                                            />
                                        </div>
                                    )}
                                />

                                {/* DRINK TEMP */}
                                <form.Field
                                    name="temp"
                                    validators={tempValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <SelectField
                                                field={field}
                                                name="Temperatura"
                                                items={TEMPS}
                                                required
                                            />
                                        </div>
                                    )}
                                />

                                {/* DRINK TYPE */}
                                <form.Field
                                    name="drinkType"
                                    validators={drinkValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <InputField
                                                field={field}
                                                name="Tipo de Bebida"
                                                placeholder="Café, Té, Refresco, ..."
                                                required
                                            />
                                        </div>
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
    const { data: product } = useProduct(id)
    const { mutateAsync: updateProductById } = useUpdateProduct()

    const form = useForm({
        defaultValues: {
            name: "", desc: "", price: "",
            type: product?.type,
            size: "", temp: "", drinkType: "",
            foodType: "", ingredients: []
        },
        onSubmit: ({ value }) => {
            const productToUpdate = { ...removeEmptyValues(value), id }
            updateProductById(productToUpdate)
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
                    {/* NAME */}
                    <form.Field
                        name="name"
                        validators={nameValidations}
                        children={(field) => (
                            <div className="grid gap-2">
                                <InputField
                                    field={field}
                                    name="Nombre"
                                    placeholder={product?.name}
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
                                    field={field}
                                    name="Descripcion"
                                    placeholder={product?.desc}
                                />
                            </div>
                        )}
                    />

                    {/* PRICE */}
                    <form.Field
                        name="price"
                        validators={priceValidators}
                        children={(field) => (
                            <div className="grid gap-2">
                                <InputField
                                    field={field}
                                    name="Precio"
                                    type="number"
                                    placeholder={product?.price.toString()}
                                />
                            </div>
                        )}
                    />

                    {/* TYPE */}
                    <Tabs value={product?.type}>
                        <TabsList>
                            <TabsTrigger value={ProductType.food}>Comida</TabsTrigger>
                            <TabsTrigger value={ProductType.drink}>Bebida</TabsTrigger>
                        </TabsList>
                        <TabsContent value={ProductType.food}>
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* FOOD INGREDIENTS */}
                                <form.Field
                                    name="ingredients"
                                    validators={ingredientsValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <MultiSelectField
                                                field={field}
                                                items={INGREDIENTS}
                                                name="Ingredientes"
                                                placeholder="Azucar, Helado, ..."
                                            />
                                        </div>
                                    )}
                                />

                                {/* FOOD TYPE */}
                                <form.Field
                                    name="foodType"
                                    validators={foodTypeValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <InputField
                                                field={field}
                                                name="Tipo de Comida"
                                                placeholder="Postre, Guarnición ,..."
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value={ProductType.drink}>
                            <div className="mt-8 grid w-full items-center gap-4">
                                {/* DRINK SIZE */}
                                <form.Field
                                    name="size"
                                    validators={sizeValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <SelectField
                                                field={field}
                                                name="Tamaño"
                                                items={SIZES}
                                            />
                                        </div>
                                    )}
                                />

                                {/* DRINK TEMP */}
                                <form.Field
                                    name="temp"
                                    validators={tempValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <SelectField
                                                field={field}
                                                name="Temperatura"
                                                items={TEMPS}
                                            />
                                        </div>
                                    )}
                                />

                                {/* DRINK TYPE */}
                                <form.Field
                                    name="drinkType"
                                    validators={drinkValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <InputField
                                                field={field}
                                                name="Tipo de Bebida"
                                                placeholder="Café, Té, Refresco, ..."
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
                <SubmitForm form={form} />
            </form>
        </ScrollArea >
    );
}
