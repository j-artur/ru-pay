import { z } from "zod";

export const idParam = z.object({ id: z.string().transform(s => parseInt(s)) });

export const paginationParams = z.object({
  page: z
    .string()
    .transform(s => parseInt(s))
    .refine(v => v >= 0, "page must be positive"),
  size: z
    .string()
    .transform(s => parseInt(s))
    .refine(v => v > 0, "size must be greater than 0"),
});
