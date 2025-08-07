import { z } from 'zod';

export const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(80, 'Name must be less than 80 characters'),
  ownerName: z
    .string()
    .trim()
    .min(1, 'Owner Name is required')
    .max(80, 'Owner Name must be less than 80 characters'),
  imageUrl: z
    .string()
    .trim()
    .refine((val) => val === '' || /^https?:\/\/.+\..+/.test(val), {
      message: 'Image URL can be empty or must be a valid URL',
    }),
  age: z.coerce
    .number()
    .int()
    .positive()
    .min(0, 'Age must be a positive number')
    .max(50, 'Age must be less than or equal to 50  years'),
  notes: z.union([
    z.literal(''),
    z.string().trim().max(500, 'Notes must be less than 500 characters'),
  ]),
});
// Only working with onSubmit not with action
// .transform((data) => ({
//   ...data,
//   imageUrl:
//     data.imageUrl ||
//     'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
// }));

export type TPetFormSchema = z.infer<typeof petFormSchema>;

export const petIdSchema = z.string().regex(/^c[a-z0-9]{24}$/, {
  message: 'Invalid Pet ID format',
});

// export const authSchema = z.object({
//   email: z.string().email('Invalid email format').max(100, 'Email is too long'),
//   password: z.string().min(4, 'Password must be at least 4 characters').max(100, 'Password is too long'),
// });
export const authSchema = z.object({
  email: z.string().email('Invalid email format').max(25),
  password: z.string().max(10),
});

export type TAuthSchema = z.infer<typeof authSchema>;
