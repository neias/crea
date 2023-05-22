import { z } from "zod";

// Error schema definition
const ErrorSchema = z.union([
  z.object({
    type: z.literal("invalidToken"),
  }),
  z.object({
    type: z.literal("network"),
    message: z.string(),
  }),
  z.object({
    type: z.literal("validation"),
    errors: z.array(z.string()),
  }),
]);

export default ErrorSchema;
