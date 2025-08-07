// import { petFormSchema } from './../lib/schema';
import { Pet } from '@/generated/prisma';

export type PetEssentials = Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>;
// export type PetEssentials = typeof petFormSchema;
