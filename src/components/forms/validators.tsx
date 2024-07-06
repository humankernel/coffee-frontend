import { Size, Temp } from "@/api/products";
import { CsType, Status } from "@/api/qs";
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
        .refine((value) => /[`!@#$%^&*()_+\[\]{};':"\\|,.<>\/?~]/.test(value),
            { message: "Debe contener al menos 1 caracter especial" })
        .refine((value) => /[a-z]/.test(value),
            { message: "Debe contener al menos 1 letra minuscula" })
        .refine((value) => /[A-Z]/.test(value),
            { message: "Debe contener al menos 1 letra Mayuscula" })
        .refine((value) => /.*[0-9].*/.test(value),
            { message: "Debe contener al menos 1 numero" })
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
}

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
        .nativeEnum(CsType)
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};

export const statusValidators = {
    onChange: z
        .nativeEnum(Status)
        .or(z.string().length(0)),
    onChangeAsyncDebounceMs: 500,
};
