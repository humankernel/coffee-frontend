import { FieldApi } from "@tanstack/react-form";
import { type ClassValue, clsx } from "clsx";
import { count } from "console";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <span className="text-sm text-white/50">
            {field.state.meta.touchedErrors ? (
                <span> {field.state.meta.touchedErrors} </span>
            ) : null}
            {field.state.meta.isValidating ? "Validating..." : null}
        </span>
    );
}

export function mostFrequent(arr: any[]) {
    if (!arr) return ""
    const counts = {};

    for (let num of arr)
        counts[num] = (counts[num] || 0) + 1;

    const maxCount = Math.max(...Object.values(counts));
    const mostFrequent = Object
        .keys(counts)
        .find(key => counts[key] === maxCount);

    return mostFrequent;
}

export const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay))

export function removeEmptyValues<T>(obj: T): T {
    const newObj = { ...obj }

    for (const key in newObj) {
        if (newObj[key] === '')
            delete newObj[key]
    }

    return newObj
}
