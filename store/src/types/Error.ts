import { z } from "zod";

// Error schema definition
const ErrorSchema = z.union([
  z.object({
    auth: z.boolean(),
    message: z.string(),
  }),
  z.object({
    type: z.literal("info"),
    message: z.string(),
  }),
  z.object({
    type: z.literal("validation"),
    errors: z.array(z.string()),
  }),
]);

export default ErrorSchema;
