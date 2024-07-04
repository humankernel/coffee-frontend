import { Size, Temp } from "@/api/products";
import { QsType } from "@/api/qs";
import { Role } from "@/api/users";
import { z } from "zod";

export const nameValidations = {
    onChange: z
        .string()
        .min(3, "Minimo 3 caracteres")
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const descValidations = {
    onChange: z
        .string()
        .min(10, "Minimo 10 caracteres")
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const ageValidators = {
    onChange: z.coerce
        .number()
        .min(1, "Campo requerido")
        .gte(0, "La edad minima es 0")
        .lte(200, "La edad maxima es 200")
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const priceValidators = {
    onChange: z.coerce
        .number()
        .gte(0, "El precio debe ser mayor que 0")
        .lte(200, "El precio debe ser menor que 200")
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const usernameValidators = {
    onChange: z
        .string()
        .min(3, "Minimo 3 caracteres")
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const passwordValidators = {
    onChange: z
        .string()
        .min(8, "Minimo 8 caracteres")
        .refine(
            (pass) => {
                const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
                const containsLowercase = (ch: string) => /[a-z]/.test(ch);
                const containsSpecialChar = (ch: string) =>
                    /[`!@#$%^&*()_+\[\]{};':"\\|,.<>\/?~]/.test(ch);
                let countOfUppercase = 0,
                    countOfLowercase = 0,
                    countOfNumbers = 0,
                    countOfSpecialChar = 0;
                for (let i = 0; i < pass.length; i++) {
                    const ch = pass.charAt(i);
                    if (!isNaN(+ch)) countOfNumbers++;
                    else if (containsUppercase(ch)) countOfUppercase++;
                    else if (containsLowercase(ch)) countOfLowercase++;
                    else if (containsSpecialChar(ch)) countOfSpecialChar++;
                }
                return (
                    countOfLowercase > 0 &&
                    countOfUppercase > 0 &&
                    countOfSpecialChar > 0 &&
                    countOfNumbers > 0
                );
            },
            {
                message:
                    "Debe contener: numeros, caracteres especiales, minusculas, Mayusculas",
            },
        )
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const roleValidators = {
    onChange: z
        .nativeEnum(Role)
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const foodTypeValidators = {
    onChange: z
        .string()
        .min(3, "Minimo 3 caracteres")
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const ingredientsValidators = {
    onChange: z
        .array(z.string()),
    onChangeAsyncDebounceMs: 500,
};

export const sizeValidators = {
    onChange: z
        .nativeEnum(Size)
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const tempValidators = {
    onChange: z
        .nativeEnum(Temp)
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const drinkValidators = {
    onChange: z
        .string()
        .min(3, "Minimo 3 caracteres")
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const qsTypeValidators = {
    onChange: z
        .nativeEnum(QsType)
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};
