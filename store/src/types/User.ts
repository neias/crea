import { z } from "zod";

// User schema definition
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

// TypeScript type inference
export type User = z.infer<typeof UserSchema>;
