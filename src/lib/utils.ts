import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function mostFrequent(arr: unknown[]) {
    if (!arr) return "";
    const counts = {};

    for (let num of arr) counts[num] = (counts[num] || 0) + 1;

    const maxCount = Math.max(...Object.values(counts));
    const mostFrequent = Object.keys(counts).find(
        (key) => counts[key] === maxCount,
    );

    return mostFrequent;
}

export function removeEmptyValues<T>(obj: T): T {
    const newObj = { ...obj };

    for (const key in newObj) {
        if (newObj[key] === "") delete newObj[key];
    }

    return newObj;
}
