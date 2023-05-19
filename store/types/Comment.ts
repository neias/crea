import { z } from "zod";

// Comment schema definition
const CommentSchema = z.object({
  id: z.number(),
  productId: z.number(),
  userId: z.number(),
  text: z.string(),
  postedAt: z.string(), // Assuming date is in ISO 8601 format, you can use z.date() if date objects are used
});

// TypeScript type inference
export type Comment = z.infer<typeof CommentSchema>;
