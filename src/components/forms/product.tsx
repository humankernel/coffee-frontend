import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { insertProduct } from "@/api/products"
import { descValidations, nameValidations, priceValidators } from "@/components/forms/validators"
import { DescField, DrinkTypeField, FoodTypeField, IngredientsField, NameField, PriceField, SizeField, SugarField, TempField } from "@/components/forms/fields"

// shadcn
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InsertProductForm() {
    const form = useForm({
        defaultValues: {
            name: '', desc: '', price: '', type: '', foodType: '',
            ingredients: '', size: '', sugar: '', temp: '', drinkType: ''
        },
        onSubmit: async ({ value }) => { return insertProduct(value) },
        validatorAdapter: zodValidator
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }} >
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
                {/* <Tabs defaultValue="food">
                    <TabsList>
                        <TabsTrigger value="food">Comida</TabsTrigger>
                        <TabsTrigger value="drink">Bebida</TabsTrigger>
                        <TabsTrigger value="raw">En Bruto</TabsTrigger>
                    </TabsList>
                    <TabsContent value="food">Make changes to your account here.</TabsContent>
                    <TabsContent value="drink">Change your password here.</TabsContent>
                    <TabsContent value="raw">Change your password here.</TabsContent>
                </Tabs> */}

                {/* FOOD TYPE */}
                <form.Field
                    name="foodType"
                    validators={priceValidators}
                    children={(field) =>
                        <FoodTypeField field={field} placeholder='helado' />
                    }
                />

                {/* FOOD INGREDIENTS */}
                <form.Field
                    name="ingredients"
                    validators={priceValidators}
                    children={(field) =>
                        <IngredientsField field={field} placeholder='leche, crema' />
                    }
                />

                {/* DRINK SIZE */}
                <form.Field
                    name="size"
                    validators={priceValidators}
                    children={(field) =>
                        <SizeField field={field} placeholder='sm' />
                    }
                />

                {/* DRINK SUGAR */}
                <form.Field
                    name="sugar"
                    validators={priceValidators}
                    children={(field) =>
                        <SugarField field={field} placeholder='' />
                    }
                />

                {/* DRINK TEMP */}
                <form.Field
                    name="temp"
                    validators={priceValidators}
                    children={(field) =>
                        <TempField field={field} placeholder='' />
                    }
                />

                {/* DRINK TYPE */}
                <form.Field
                    name="drinkType"
                    validators={priceValidators}
                    children={(field) =>
                        <DrinkTypeField field={field} placeholder='cafe' />
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
        </form >
    )
}



