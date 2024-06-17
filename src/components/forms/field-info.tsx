import { FieldApi } from "@tanstack/react-form";

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
