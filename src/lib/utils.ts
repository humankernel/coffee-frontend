import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function mostFrequent(
    items: (string | number)[],
): string | number | undefined {
    if (items.length === 0) {
        return undefined;
    }

    const frecuency: { [key: string | number]: number } = {};
    let maxFrecuency = 0;
    let mostCommon: number | string | undefined;

    for (let i = 0; i < items.length; i++) {
        const value = items[i];

        if (frecuency[value] === undefined) {
            frecuency[value] = 1;
        } else {
            frecuency[value]++;
        }

        if (frecuency[value] > maxFrecuency) {
            maxFrecuency = frecuency[value];
            mostCommon = value;
        }
    }

    return mostCommon;
}

export function removeEmptyValues<T>(obj: T): T {
    const newObj = { ...obj };

    for (const key in newObj) {
        if (newObj[key] === "") delete newObj[key];
    }

    return newObj;
}
