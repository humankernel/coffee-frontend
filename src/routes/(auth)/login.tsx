import { Link, createFileRoute, redirect, useNavigate, useRouter } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { Button } from '@/components/ui/button'
import { PasswordField, UsernameField } from "@/components/forms/fields"
import { usernameValidators, passwordValidators } from "@/components/forms/validators"
import { useAuth } from '@/context/auth'
import { z } from 'zod'
import { toast } from 'sonner'

const fallback = "/" as const

export const Route = createFileRoute('/(auth)/login')({
    validateSearch: z.object({
        redirect: z.string().optional().catch("")
    }),
    beforeLoad: ({ context, search }) => {
        if (context.auth.isAuthenticated)
            throw redirect({ to: search.redirect || fallback })
    },
    component: LoginPage
})

export function LoginPage() {
    const { login } = useAuth()
    const router = useRouter()
    const navigate = useNavigate()
    const search = Route.useSearch()

    const form = useForm({
        defaultValues: { username: '', password: '' },
        onSubmit: async ({ value }) => {
            try {
                await login({ ...value })
                await router.invalidate()
                await navigate({ to: search.redirect || fallback })
            } catch (error) {
                // toast.error("Ocurrio un error al iniciar sesion")
                toast.error(error?.message)
            }
        },
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
                                validators={usernameValidators}
                                children={(field) =>
                                    <UsernameField field={field} placeholder='johndoe' />
                                }
                            />

                            {/* PASSWORD */}
                            <form.Field
                                name="password"
                                validators={passwordValidators}
                                children={(field) =>
                                    <PasswordField field={field} placeholder='****' />
                                }
                            />

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

