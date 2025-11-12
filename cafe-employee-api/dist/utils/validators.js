"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeSchema = exports.createEmployeeSchema = exports.updateCafeSchema = exports.createCafeSchema = exports.genderSchema = exports.emailSchema = exports.sgPhoneSchema = void 0;
const zod_1 = require("zod");
exports.sgPhoneSchema = zod_1.z.string().regex(/^[89]\d{7}$/, {
    message: "Phone must start with 8 or 9 and have 8 digits"
});
exports.emailSchema = zod_1.z.string().email();
exports.genderSchema = zod_1.z.enum(["Male", "Female"]);
exports.createCafeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    logo: zod_1.z.string().url().optional().or(zod_1.z.literal("").transform(() => undefined)),
    location: zod_1.z.string().min(1)
});
exports.updateCafeSchema = exports.createCafeSchema.partial();
exports.createEmployeeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: exports.emailSchema,
    phoneNumber: exports.sgPhoneSchema,
    gender: exports.genderSchema,
    startDate: zod_1.z.coerce.date().optional(),
    cafeId: zod_1.z.string().uuid().optional()
});
exports.updateEmployeeSchema = exports.createEmployeeSchema.partial();
