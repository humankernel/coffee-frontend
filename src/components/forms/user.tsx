import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InputField, SelectField, SubmitForm } from "@/components/forms/fields";
import {
    nameValidations,
    ageValidators,
    usernameValidators,
    passwordValidators,
    roleValidators,
} from "@/components/forms/validators";
// shadcn
import { User, getUser, insertUser, updateUser } from "@/api/users";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ROLES } from "@/constants";

export function InsertUserForm() {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationKey: ["insert-user"],
        mutationFn: insertUser,
        onSuccess: () => {
            toast.success("Usuario insertado correctamente");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => toast.error("Error al insertar el usuario"),
    });

    const form = useForm({
        defaultValues: { name: "", age: "", username: "", password: "", role: "" },
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
                            <InputField
                                name="Nombre"
                                field={field}
                                placeholder="John"
                                required
                            />
                        )}
                    />

                    {/* AGE */}
                    <form.Field
                        name="age"
                        validators={ageValidators}
                        children={(field) => (
                            <InputField
                                name="Edad"
                                type="number"
                                field={field}
                                placeholder="18"
                                required
                            />
                        )}
                    />

                    {/* USERNAME */}
                    <form.Field
                        name="username"
                        validators={usernameValidators}
                        children={(field) => (
                            <InputField
                                name="Nombre de Usuario"
                                field={field}
                                placeholder="johndoe"
                                required
                            />
                        )}
                    />

                    {/* PASSWORD */}
                    <form.Field
                        name="password"
                        validators={passwordValidators}
                        children={(field) => (
                            <InputField
                                name="Contraseña"
                                type="password"
                                field={field}
                                placeholder="****"
                                required
                            />
                        )}
                    />

                    {/* ROLE */}
                    <form.Field
                        name="role"
                        validators={roleValidators}
                        children={(field) =>
                            <SelectField
                                name="Rol"
                                items={ROLES}
                                field={field}
                                required
                            />
                        }
                    />
                </div>

                <SubmitForm form={form} />
            </form>
        </ScrollArea>
    );
}

export function UpdateUserForm({ id }: { id: number }) {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: [id, "user"],
        queryFn: async () => getUser(id),
    });

    const { mutateAsync } = useMutation({
        mutationKey: [id, "update-user"],
        mutationFn: (value: Partial<User>) => updateUser(id, value),
        onSuccess: () => {
            toast.success("Usuario actualizado correctamente");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => toast.error("Error al actualizar el usuario"),
    });

    const form = useForm({
        defaultValues: { name: "", age: "", username: "", password: "", role: "", },
        onSubmit: async ({ value }) => mutateAsync(value),
        validatorAdapter: zodValidator,
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
        }} >
            <div className="grid w-full items-center gap-4">
                {/* NAME */}
                <form.Field
                    name="name"
                    validators={nameValidations}
                    children={(field) => (
                        <InputField
                            name="Nombre"
                            field={field}
                            placeholder={data?.name ?? "John"}
                        />
                    )}
                />

                {/* AGE */}
                <form.Field
                    name="age"
                    validators={ageValidators}
                    children={(field) => (
                        <InputField
                            name="Edad"
                            type="number"
                            field={field}
                            placeholder={data?.age?.toString() ?? "18"}
                        />
                    )}
                />

                {/* USERNAME */}
                <form.Field
                    name="username"
                    validators={usernameValidators}
                    children={(field) => (
                        <InputField
                            name="Nombre de Usuario"
                            field={field}
                            placeholder={data?.username ?? "johndoe"}
                        />
                    )}
                />

                {/* PASSWORD */}
                <form.Field
                    name="password"
                    validators={passwordValidators}
                    children={(field) => (
                        <InputField
                            name="Contraseña"
                            type="password"
                            field={field}
                            placeholder="****"
                        />
                    )}
                />

                {/* ROLE */}
                <form.Field
                    name="role"
                    validators={roleValidators}
                    children={(field) =>
                        <SelectField
                            name="Rol"
                            items={ROLES}
                            field={field}
                        />
                    }
                />
            </div>

            <SubmitForm form={form} />
        </form>
    );
}
