'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { signIn } from '@/lib/auth';
import { petFormSchema, petIdSchema } from '@/lib/schema';
import { Pet } from '@/generated/prisma';

// ---- user actions ----

export const logIn = async (formData: FormData) => {
  const authData = Object.fromEntries(formData.entries());

  await signIn('credentials', authData);
};

// --- pet actions ---

export const getPets = async (): Promise<Pet[]> => {
  try {
    return await prisma.pet.findMany();
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

export const addPet = async (
  pet: unknown,
): Promise<{ message: string } | undefined> => {
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return { message: 'Invalid pet data.' };
  }

  try {
    await prisma.pet.create({ data: validatedPet.data });
  } catch (error) {
    return {
      message: `Error adding pet: ${error}`,
    };
  }

  revalidatePath('/app', 'layout');
};

export const editPet = async (
  pet: unknown,
  id: unknown,
): Promise<{ message: string } | undefined> => {
  const validatedPet = petFormSchema.safeParse(pet);
  const validatedId = petIdSchema.safeParse(id);

  if (!validatedPet.success || !validatedId.success) {
    return { message: 'Invalid pet data.' };
  }

  try {
    await prisma.pet.update({
      where: { id: validatedId.data },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: `Error editing pet: ${error}`,
    };
  }

  revalidatePath('/app', 'layout');
};

export const deletePet = async (
  id: unknown,
): Promise<{ message: string } | undefined> => {
  const validatedId = petIdSchema.safeParse(id);

  if (!validatedId.success) {
    return { message: 'Invalid pet ID format.' };
  }

  try {
    await prisma.pet.delete({
      where: { id: validatedId.data },
    });
  } catch (error) {
    return { message: `Error deleting pet: ${error}` };
  }

  revalidatePath('/app', 'layout');
};
