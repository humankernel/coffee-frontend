import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { z } from "zod"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FieldInfo } from "./field-info"
import { getUser, insertUser, updateUser } from "@/api/users"
import { useQuery } from "@tanstack/react-query"

export function InsertUserForm() {
    const form = useForm({
        defaultValues: { name: '', username: '', password: '', role: '' },
        onSubmit: async ({ value }) => { return insertUser(value) },
        validatorAdapter: zodValidator
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }} >
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
                                        Nombre:
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
                                Username:
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
                                Password:
                            </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder='****'
                                type="password"
                            />
                            <FieldInfo field={field} />
                        </div>
                    )}
                />
                <form.Field
                    name="role"
                    children={(field) => (
                        <>
                            <Label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Role:
                            </Label>
                            <Select
                                name={field.name}
                                value={field.state.value}
                                onValueChange={(e) => field.handleChange(e)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="almacenero">Almacenero</SelectItem>
                                    <SelectItem value="supplier">Supplier</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldInfo field={field} />
                        </>
                    )}
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


export function UpdateUserForm({ id }: { id: number }) {
    const { data } = useQuery({
        queryKey: [id, 'user'],
        queryFn: async () => getUser(id)
    })

    const form = useForm({
        defaultValues: { name: "", username: "", password: "", role: "" },
        onSubmit: async ({ value }) => { return updateUser(id, value) },
        validatorAdapter: zodValidator
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }} >
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
                    children={(field) =>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nombre:
                            </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder={data?.name}
                            />
                            <FieldInfo field={field} />
                        </div>
                    }
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
                                Username:
                            </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder={data?.username}
                            />
                            <FieldInfo field={field} />
                        </div>
                    }
                />
                <form.Field
                    name="password"
                    children={(field) => (
                        <>
                            <Label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password:
                            </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder={data?.password}
                                type="password"
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                />
                <form.Field
                    name="role"
                    children={(field) => (
                        <>
                            <Label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Role:
                            </Label>
                            <Select
                                name={field.name}
                                value={field.state.value}
                                onValueChange={(e) => field.handleChange(e)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="almacenero">Almacenero</SelectItem>
                                    <SelectItem value="supplier">Supplier</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldInfo field={field} />
                        </>
                    )}
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
