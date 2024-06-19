import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import { Input } from '@/components/ui/input'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import { register } from '@/queries/auth'

export const Route = createLazyFileRoute('/auth/register')({
    component: RegisterPage
})

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <span className='text-white/50 text-sm'>
            {field.state.meta.touchedErrors ? (
                <span> {field.state.meta.touchedErrors} </span>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </span>
    )
}

export function RegisterPage() {
    const form = useForm({
        defaultValues: { name: '', username: '', password: '' },
        onSubmit: async ({ value }) => { return register(value) },
        validatorAdapter: zodValidator
    })

    return (
        <section className='h-screen grid place-content-center'>
            <form onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }} >
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Crear Cuenta</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <form.Field
                                name="name"
                                validators={{
                                    onChange: z
                                        .string()
                                        .min(3, "Name must be at least 3 characters")
                                        .optional(),
                                    onChangeAsyncDebounceMs: 500,
                                    onChangeAsync: z.string().refine(
                                        async (value) => {
                                            await new Promise((resolve) => setTimeout(resolve, 1000))
                                            return !value.includes('error')
                                        },
                                        { message: "No 'error' allowed in first name", },
                                    ),
                                }}
                                children={(field) => {
                                    return (
                                        <>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Nombre
                                                </Label>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    placeholder='John'
                                                />
                                                <FieldInfo field={field} />
                                            </div>
                                        </>
                                    )
                                }}
                            />
                            <form.Field
                                name="username"
                                validators={{
                                    onChange: z
                                        .string()
                                        .min(3, "Username must be at least 3 characters")
                                        .optional(),
                                    onChangeAsyncDebounceMs: 500,
                                    onChangeAsync: z.string().refine(
                                        async (value) => {
                                            await new Promise((resolve) => setTimeout(resolve, 1000))
                                            return !value.includes('error')
                                        },
                                        { message: "No 'error' allowed in first name", },
                                    ),
                                }}
                                children={(field) =>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Nombre de usuario
                                        </Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder='johndoe'
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                }
                            />
                            <form.Field
                                name="password"
                                children={(field) => (
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Contrasena
                                        </Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder='****'
                                            type='password'
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            />
                        </div>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                            Tienes una cuenta?
                            <Link to="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Iniciar Session</Link>
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancelar</Button>
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <Button type="submit" size="sm" disabled={!canSubmit}>
                                    {isSubmitting ? '...' : 'Aceptar'}
                                </Button>
                            )}
                        />
                    </CardFooter>
                </Card>
            </form >
        </section>
    )
}

