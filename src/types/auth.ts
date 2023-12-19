import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("invalid email format").min(5),
  password: z.string().min(5),
});

const register = authSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password != data.confirmPassword, {
    message: "password dan confirmPassword tidak sesuai",
    path: ["confirmPassword"],
  });
export type RegisterType = z.infer<typeof register>;
export type LoginType = z.infer<typeof authSchema>;
