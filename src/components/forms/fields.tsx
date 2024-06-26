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
import { Textarea } from "@/components/ui/textarea"

import { type FieldApi } from "@tanstack/react-form"
import { FieldInfo } from "@/lib/utils"

type FieldParams = { field: FieldApi<any, any, any, any>, placeholder: string }

export function NameField({ field, placeholder }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Nombre </Label>
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
        <Label htmlFor={field.name}> Role </Label>
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

export function DescField({ field, placeholder }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Descripcion </Label>
        <Textarea
            id={field.name}
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder={placeholder}
        />
        <FieldInfo field={field} />
    </div>
}

export function PriceField({ field, placeholder }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Price </Label>
        <Input
            id={field.name}
            name={field.name}
            value={field.state.value}
            type="number"
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder={placeholder}
        />
        <FieldInfo field={field} />
    </div>
}

export function FoodTypeField({ field, placeholder }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Tipo de Comida </Label>
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

export function IngredientsField({ field, placeholder }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Ingredientes </Label>
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

// FIX si o no
export function SugarField({ field, placeholder }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Azucar </Label>
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

export function SizeField({ field }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Tamaño </Label>
        <Select
            name={field.name}
            value={field.state.value}
            onValueChange={(e) => field.handleChange(e)}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar Tamaño" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="sm">Pequeño</SelectItem>
                <SelectItem value="md">Mediano</SelectItem>
                <SelectItem value="lg">Grande</SelectItem>
            </SelectContent>
        </Select>
        <FieldInfo field={field} />
    </div>
}

export function TempField({ field }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Temperatura </Label>
        <Select
            name={field.name}
            value={field.state.value}
            onValueChange={(e) => field.handleChange(e)}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona la Temperatura" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="cold">Frio</SelectItem>
                <SelectItem value="hot">Caliente</SelectItem>
            </SelectContent>
        </Select>
        <FieldInfo field={field} />
    </div>
}

export function DrinkTypeField({ field, placeholder }: FieldParams) {
    return <div className="grid gap-2">
        <Label htmlFor={field.name}> Tipo de Bebida </Label>
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
