import { z } from "zod";

export const idParam = z.object({ id: z.string().transform(s => parseInt(s)) });

export const paginationParams = z.object({
  page: z.string().transform(Number),
  size: z.string().transform(Number),
});

export const exclude = <T, K extends keyof T>(o: T, ...ks: K[]): Omit<T, K> => {
  ks.forEach(k => delete o[k]);
  return o;
};
