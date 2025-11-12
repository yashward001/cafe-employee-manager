import { z } from "zod";

export const sgPhoneSchema = z.string().regex(/^[89]\d{7}$/, {
  message: "Phone must start with 8 or 9 and have 8 digits"
});

export const emailSchema = z.string().email();

export const genderSchema = z.enum(["Male", "Female"]);

export const createCafeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  logo: z.string().url().optional().or(z.literal("").transform(() => undefined)),
  location: z.string().min(1)
});

export const updateCafeSchema = createCafeSchema.partial();

export const createEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(3, "Phone number too short"),
  gender: z.enum(["M", "F", "U"]).default("U"),
  startDate: z.string().optional(),
  cafeId: z.string().uuid().nullable().optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();