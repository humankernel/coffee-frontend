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
import { Label } from "@/components/ui/label"

export const Route = createLazyFileRoute('/auth/login')({
    component: LoginPage
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

export function LoginPage() {
    const form = useForm({
        defaultValues: { username: '', password: '', },
        onSubmit: async ({ value }) => { console.log(value) },
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
                        <CardTitle>Inicia sesion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <form.Field
                                name="username"
                                validators={{
                                    onChange: z
                                        .string()
                                        .min(3, "Username must be at least 3 characters"),
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
                                            Nombre de Usuario
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
                        </div>
                        <br />
                        <form.Field
                            name="password"
                            validators={{
                                onChange: z
                                    .string()
                                    .min(8, "Password must be at least 8 characters")
                                    .refine(pass => {
                                        const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
                                        const containsLowercase = (ch: string) => /[a-z]/.test(ch)
                                        const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_+\[\]{};':"\\|,.<>\/?~]/.test(ch)
                                        let countOfUppercase = 0,
                                            countOfLowercase = 0,
                                            countOfNumbers = 0,
                                            countOfSpecialChar = 0;
                                        for (let i = 0; i < pass.length; i++) {
                                            let ch = pass.charAt(i)
                                            if (!isNaN(+ch)) countOfNumbers++;
                                            else if (containsUppercase(ch)) countOfUppercase++;
                                            else if (containsLowercase(ch)) countOfLowercase++;
                                            else if (containsSpecialChar(ch)) countOfSpecialChar++;
                                        }
                                        return (countOfLowercase > 0 && countOfUppercase > 0 && countOfSpecialChar > 0 && countOfNumbers > 0)
                                    }, { message: "Password must contain numbers, special characters, lowercase, uppercase " }),
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: z.string().refine(
                                    async (value) => {
                                        await new Promise((resolve) => setTimeout(resolve, 1000))
                                        return !value.includes('error')
                                    },
                                    { message: "No 'error' allowed in first name", },
                                ),
                            }}

                            children={(field) => (
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password:
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
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                            No tienes una cuenta?
                            <Link to="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrase</Link>
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

