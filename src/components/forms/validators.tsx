import { Size, Temp } from "@/api/products"
import { Role } from "@/api/users"
import { z } from "zod"

export const nameValidations = {
    onChange: z
        .string()
        .min(3, "debe ser contener al menos 3 caracteres"),
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: z.string().refine(
        async (value) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return !value.includes('error')
        },
        { message: "No 'error' allowed in name", },
    ),
}

export const descValidations = {
    onChange: z
        .string()
        .min(1),
    onChangeAsyncDebounceMs: 500,
}

export const ageValidators = {
    onChange: z
        .coerce
        .number()
        .gte(0, "La edad minima es 0")
        .lte(200, "La edad maxima es 200")
    ,
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: z.coerce.number().refine(
        async (value) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return value >= 0
        },
        { message: "Solamente puedes aumentar la edad", },
    ),
}

export const priceValidators = {
    onChange: z
        .coerce
        .number()
        .gte(0, "El precio debe ser mayor que 0")
        .lte(200, "El precio debe ser menor que 200")
    ,
    onChangeAsyncDebounceMs: 500,
}



export const usernameValidators = {
    onChange: z
        .string()
        .min(3, "debe ser contener al menos 3 caracteres"),
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: z.string().refine(
        async (value) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return !value.includes("error")
        },
        { message: "'error' no esta permitido en el nombre de usuario", },
    ),
}

export const passwordValidators = {
    onChange: z
        .string()
        .min(8, "debe contener al menos 8 caracters")
        .refine(pass => {
            const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
            const containsLowercase = (ch: string) => /[a-z]/.test(ch)
            const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_+\[\]{};':"\\|,.<>\/?~]/.test(ch)
            let countOfUppercase = 0,
                countOfLowercase = 0,
                countOfNumbers = 0,
                countOfSpecialChar = 0;
            for (let i = 0; i < pass.length; i++) {
                const ch = pass.charAt(i)
                if (!isNaN(+ch)) countOfNumbers++;
                else if (containsUppercase(ch)) countOfUppercase++;
                else if (containsLowercase(ch)) countOfLowercase++;
                else if (containsSpecialChar(ch)) countOfSpecialChar++;
            }
            return (countOfLowercase > 0 && countOfUppercase > 0 && countOfSpecialChar > 0 && countOfNumbers > 0)
        }, { message: "debe contener numeros, caracteres especiales, minusculas y mayusculas" }),
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: z.string().refine(
        async (value) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return !value.includes('error')
        },
        { message: "No 'error' allowed in first name", },
    ),
}

export const roleValidators = {
    onChange: z.nativeEnum(Role),
    onChangeAsyncDebounceMs: 500,
}


export const foodTypeValidators = {
    onChange: z.string().min(3),
    onChangeAsyncDebounceMs: 500,
}

export const ingredientsValidators = {
    onChange: z
        .string()
        .transform(value => value.split(','))
        .pipe(z.string().array()),
    onChangeAsyncDebounceMs: 500,
}

export const sizeValidators = {
    onChange: z.nativeEnum(Size),
    onChangeAsyncDebounceMs: 500,
}

// FIX:
export const sugarValidators = {
    onChange: z.string(),
    onChangeAsyncDebounceMs: 500,
}

export const tempValidators = {
    onChange: z.nativeEnum(Temp),
    onChangeAsyncDebounceMs: 500,
}

export const drinkValidators = {
    onChange: z.string().min(3),
    onChangeAsyncDebounceMs: 500,
}
