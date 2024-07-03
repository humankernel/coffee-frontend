import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { User, updateUser } from "@/api/users";
import { queryClient } from "@/main";
import { useAuth } from "@/context/auth";
import {
    ageValidators,
    nameValidations,
    usernameValidators,
} from "@/components/forms/validators";
import { InputField, SubmitForm } from "@/components/forms/fields";
import { zodValidator } from "@tanstack/zod-form-adapter";
// shadcn
import { Button } from "@/components/ui/button";
import { ImageIcon, ImageOffIcon } from "lucide-react";
import { toast } from "sonner";
import { userOptions } from "@/queries/users";

export const Route = createFileRoute("/_profile/profile/")({
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated)
            throw redirect({
                to: "/login",
                search: { redirect: location.href },
            });
    },
    loader: ({ context: { queryClient, auth } }) => {
        const id = auth.user?.sub
        return queryClient.ensureQueryData(userOptions(id))
    },
    component: ProfilePage,
});

function ProfilePage() {
    const img = "avatar.svg";
    const { user } = useAuth()
    const { data } = useSuspenseQuery(userOptions(user?.sub));

    const { mutateAsync } = useMutation({
        mutationKey: [user?.sub, "update-user"],
        mutationFn: (value: Partial<User>) => updateUser(user?.sub, value),
        onSuccess: () => {
            toast.success("Usuario actualizado correctamente");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => toast.error("Error al actualizar el usuario"),
    });

    const form = useForm({
        defaultValues: { name: "", username: "", age: "" },
        onSubmit: async ({ value }) => mutateAsync(value),
        validatorAdapter: zodValidator
    });

    return (
        <main className="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4">
            <div className="p-2 md:p-4">
                <div className="mt-8 w-full px-6 pb-8 sm:max-w-xl sm:rounded-lg">
                    <h2 className="text-center text-2xl font-bold sm:pl-6 sm:text-left sm:text-xl">
                        Perfil Publico
                    </h2>

                    <div className="mx-auto mt-8 grid max-w-2xl">
                        <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                            <img
                                className="h-40 w-40 rounded-full object-cover p-1 ring-2 ring-primary"
                                src={img}
                                alt="Bordered avatar"
                            />

                            {/* <div className="grid grid-cols-2 items-center gap-2 sm:ml-8 sm:grid-cols-1">
                                <Button variant="outline">
                                    <ImageIcon className="mr-2 h-4 w-4" />
                                    Cambiar imagen
                                </Button>
                                <Button variant="outline" >
                                    <ImageOffIcon className="mr-2 h-4 w-4" />
                                    Eliminar imagen
                                </Button>
                            </div> */}
                        </div>

                        <div className="mt-8 items-center sm:mt-14">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    form.handleSubmit();
                                }}
                            >
                                {/* NAME */}
                                <form.Field
                                    name="name"
                                    validators={nameValidations}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <InputField
                                                name="Nombre"
                                                field={field}
                                                placeholder={data?.name ?? "John"}
                                            />
                                        </div>
                                    )}
                                />

                                {/* AGE */}
                                <form.Field
                                    name="age"
                                    validators={ageValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <InputField
                                                name="Edad"
                                                type="number"
                                                field={field}
                                                placeholder={data?.age.toString() ?? "18"}
                                            />
                                        </div>
                                    )}
                                />

                                {/* USERNAME */}
                                <form.Field
                                    name="username"
                                    validators={usernameValidators}
                                    children={(field) => (
                                        <div className="grid gap-2">
                                            <InputField
                                                name="Nombre de Usuario"
                                                field={field}
                                                placeholder={data?.username ?? "johndoe"}
                                            />
                                        </div>
                                    )}
                                />

                                <SubmitForm form={form} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
