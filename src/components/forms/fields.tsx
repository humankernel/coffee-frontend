// shadcn
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FieldInfo } from "./field-info"

import { type FieldApi } from "@tanstack/react-form"

type FieldParams = { field: FieldApi<any, any, any, any>, placeholder: string }

export function NameField({ field, placeholder }: FieldParams) {
    return <div className="flex flex-col space-y-1.5">
        <Label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nombre:
        </Label>
        <Input
            id={field.name}
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder={placeholder}
        />
        <FieldInfo field={field} />
    </div>
}


export function AgeField({ field, placeholder }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Edad </Label>
        <Input
            id={field.name}
            name={field.name}
            value={field.state.value}
            type="number"
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder={placeholder}
        />
        <FieldInfo field={field} />
    </div>
}

export function UsernameField({ field, placeholder }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Nombre de Usuario </Label>
        <Input
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder={placeholder}
        />
        <FieldInfo field={field} />
    </div>
}

export function PasswordField({ field, placeholder }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Contraseña </Label>
        <Input
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            type='password'
            placeholder={placeholder}
        />
        <FieldInfo field={field} />
    </div>
}

export function RoleField({ field }: Omit<FieldParams, 'placeholder'>) {
    return <div className="grid gap-2">
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
    </div>
}
