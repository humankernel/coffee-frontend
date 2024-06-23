import { FieldApi } from "@tanstack/react-form";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <span className='text-white/50 text-sm'>
            {field.state.meta.touchedErrors ? (
                <span> {field.state.meta.touchedErrors} </span>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </span>
    )
}
