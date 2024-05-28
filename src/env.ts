import { z } from "zod";

const envSchema = z.object({
  API_BASE: z.string().min(1),
});

export const env = envSchema.parse({
  API_BASE: "http://localhost:3000",
});
