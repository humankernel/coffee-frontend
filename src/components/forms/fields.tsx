import { FormApi, type FieldApi } from "@tanstack/react-form";
import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
// shadcn
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { LoaderIcon } from "lucide-react";


type FieldParams = {
    name: string
    field: FieldApi<any, any, any, any>;
};

type InputParams =
    InputHTMLAttributes<HTMLInputElement> &
    FieldParams

type TextAreaParams =
    TextareaHTMLAttributes<HTMLTextAreaElement> &
    FieldParams

type SelectItem = { label: string, value: string, icon: string }
type SelectFieldParams =
    SelectHTMLAttributes<HTMLSelectElement> &
    FieldParams &
    { items: SelectItem[] }

type MultiSelectFieldParams =
    FieldParams &
    { items: SelectItem[], placeholder: string }


export function SubmitForm({ form }: { form: FormApi<any, any> }) {
    return <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting,]}
        children={([canSubmit, isSubmitting]) => (
            <div className="flex justify-between">
                <Button type="reset" variant="outline" onClick={form.reset}>
                    Limpiar
                </Button>
                <Button type="submit" size="sm" disabled={!canSubmit} >
                    {isSubmitting
                        ? <LoaderIcon className="h-4 w-4 animate-spin" />
                        : "Aceptar"}
                </Button>
            </div>
        )}
    />
}

export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <span className="text-sm font-semibold text-white/60">{field.state.meta.touchedErrors}</span>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

export function InputField({ name, field, ...props }: InputParams) {
    return (
        <>
            <Label htmlFor={field.name}> {name} </Label>
            <Input
                {...props}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
        </>
    )
}

export function TextAreaField({ name, field, ...props }: TextAreaParams) {
    return (
        <>
            <Label htmlFor={field.name}> {name} </Label>
            <Textarea
                {...props}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
        </>
    );
}

export function SelectField({ name, items, field, ...props }: SelectFieldParams) {
    return (
        <>
            <Label htmlFor={field.name}> {name} </Label>
            <Select
                name={field.name}
                value={field.state.value}
                onValueChange={(e) => field.handleChange(e)}
            >
                <SelectTrigger>
                    <SelectValue {...props} />
                </SelectTrigger>
                <SelectContent>
                    {items.map(item =>
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>
            <FieldInfo field={field} />
        </>
    );
}


export function MultiSelectField(
    { name, items, field, placeholder }: MultiSelectFieldParams
) {
    return (
        <>
            <Label htmlFor={field.name}> {name} </Label>
            <MultiSelect
                options={items}
                onValueChange={v => field.handleChange(v)}
                defaultValue={field.state.value}
                variant="inverted"
                animation={2}
                maxCount={3}
                placeholder={placeholder}
            />
            <FieldInfo field={field} />
        </>
    );
}
