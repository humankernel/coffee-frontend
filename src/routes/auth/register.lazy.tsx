import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { Button } from '@/components/ui/button'
import { register } from '@/api/auth'
import { AgeField, NameField, PasswordField, UsernameField } from "@/components/forms/fields"
import { nameValidations, ageValidators, usernameValidators, passwordValidators } from "@/components/forms/validators"

export const Route = createLazyFileRoute('/auth/register')({
    component: RegisterPage
})


export function RegisterPage() {
    const form = useForm({
        defaultValues: { name: '', age: '', username: '', password: '', },
        onSubmit: async ({ value }) => { await register(value) },
        validatorAdapter: zodValidator
    })

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
            <div className="flex items-center justify-center h-full">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Registrarse</h1>
                        <p className="text-balance text-muted-foreground">
                            Escribe tus datos personales
                        </p>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }} >
                        <div className="grid gap-4">
                            {/* NAME */}
                            <form.Field
                                name="name"
                                validators={nameValidations}
                                children={(field) =>
                                    <NameField field={field} placeholder='John' />
                                }
                            />

                            {/* AGE */}
                            <form.Field
                                name="age"
                                validators={ageValidators}
                                children={(field) =>
                                    <AgeField field={field} placeholder='18' />
                                }
                            />

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
                                        {isSubmitting ? '...' : 'Registrarse'}
                                    </Button>
                                )}
                            />
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Ya tienes una cuenta?{" "}
                            <Link to='/auth/register' className="underline">
                                Loguearse
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

