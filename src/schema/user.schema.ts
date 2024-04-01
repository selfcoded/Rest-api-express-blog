import { string, object, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({ required_error: "name is required" }),
    password: string({ required_error: "password is required" }).min(
      8,
      "password must be at least 8 digits"
    ),
    confirmPassword: string({ required_error: "pls confirm your password" }),
    email: string({ required_error: "email is required" }).email(
      "email is not valid"
    ),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.confirmPassword"
>;
