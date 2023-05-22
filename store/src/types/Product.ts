import { z } from "zod";

// Product schema definition
const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  price: z.number(),
  score: z.number(),
  image: z.string(),
  addedAt: z.string(), // Assuming date is in ISO 8601 format, you can use z.date() if date objects are used
});

// TypeScript type inference
// export type Product = z.infer<typeof ProductSchema>;

export default ProductSchema;
