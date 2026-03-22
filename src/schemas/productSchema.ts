import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  price: z
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(999999, 'Price is too high'),
  category: z.string().min(1, 'Category is required'),
  stock: z
    .number()
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative'),
});

export type ProductFormData = z.infer<typeof productSchema>;
