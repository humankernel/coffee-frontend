import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { Input } from '@/components/ui/input'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { login } from '@/api/auth'
import { FieldInfo } from '@/lib/utils'

export const Route = createLazyFileRoute('/auth/login')({
    component: LoginPage
})


export function LoginPage() {
    const form = useForm({
        defaultValues: { username: '', password: '', },
        onSubmit: async ({ value }) => { await login(value) },
        validatorAdapter: zodValidator
    })

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
            <div className="flex items-center justify-center h-full">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Iniciar Sesion</h1>
                        <p className="text-balance text-muted-foreground">
                            Escribe tu nombre de usuario y contraseña
                        </p>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }} >
                        <div className="grid gap-4">
                            {/* USERNAME */}
                            <form.Field
                                name="username"
                                validators={{
                                    onChange: z
                                        .string()
                                        .min(3, "debe ser contener al menos 3 caracteres"),
                                    onChangeAsyncDebounceMs: 500,
                                    onChangeAsync: z.string().refine(
                                        async (value) => {
                                            await new Promise((resolve) => setTimeout(resolve, 1000))
                                            return !value.includes('error')
                                        },
                                        { message: "No 'error' allowed in first name", },
                                    ),
                                }}
                            >

                                {(field) =>
                                    <div className="grid gap-2">
                                        <Label htmlFor={field.name}> Nombre de Usuario </Label>
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
                            </form.Field>

                            {/* PASSWORD */}
                            <form.Field
                                name="password"
                                validators={{
                                    onChange: z
                                        .string()
                                        .min(8, "debe contener al menos 8 caracters")
                                        .refine(pass => {
                                            const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
                                            const containsLowercase = (ch: string) => /[a-z]/.test(ch)
                                            const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_+\[\]{};':"\\|,.<>\/?~]/.test(ch)
                                            let countOfUppercase = 0,
                                                countOfLowercase = 0,
                                                countOfNumbers = 0,
                                                countOfSpecialChar = 0;
                                            for (let i = 0; i < pass.length; i++) {
                                                const ch = pass.charAt(i)
                                                if (!isNaN(+ch)) countOfNumbers++;
                                                else if (containsUppercase(ch)) countOfUppercase++;
                                                else if (containsLowercase(ch)) countOfLowercase++;
                                                else if (containsSpecialChar(ch)) countOfSpecialChar++;
                                            }
                                            return (countOfLowercase > 0 && countOfUppercase > 0 && countOfSpecialChar > 0 && countOfNumbers > 0)
                                        }, { message: "debe contener numeros, caracteres especiales, minusculas y mayusculas" }),
                                    onChangeAsyncDebounceMs: 500,
                                    onChangeAsync: z.string().refine(
                                        async (value) => {
                                            await new Promise((resolve) => setTimeout(resolve, 1000))
                                            return !value.includes('error')
                                        },
                                        { message: "No 'error' allowed in first name", },
                                    ),
                                }}

                            >
                                {(field) => (
                                    <div className="grid gap-2">
                                        <Label htmlFor={field.name}> Contraseña </Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            type='password'
                                            placeholder='****'
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            </form.Field>

                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                                children={([canSubmit, isSubmitting]) => (
                                    <Button type="submit" size="sm" disabled={!canSubmit}>
                                        {isSubmitting ? '...' : 'Logearse'}
                                    </Button>
                                )}
                            />
                        </div>
                        <div className="mt-4 text-center text-sm">
                            No tienes una cuenta?{" "}
                            <Link to='/auth/register' className="underline">
                                Registrarse
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <img
                    src="../../assets/home-img.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}

