'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { auth, signIn, signOut } from '@/lib/auth';
import { petFormSchema, petIdSchema } from '@/lib/schema';
import { Pet } from '@/generated/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { checkAuth } from '@/lib/serverUtils';

// ---- user actions ----
export const logIn = async (formData: FormData) => {
  const authData = Object.fromEntries(formData.entries());

  await signIn('credentials', authData);
};

export const logOut = async () => {
  // 'use server';
  await signOut({ redirectTo: '/' });
};

export const signUp = async (formData: FormData) => {
  const authData = Object.fromEntries(formData.entries());

  const hashedPassword = await bcrypt.hash(
    formData.get('password') as string,
    10,
  );
  const email = formData.get('email') as string;

  await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  });

  await signIn('credentials', authData);
};

// --- pet actions ---
export const getPets = async (): Promise<Pet[]> => {
  const session = await checkAuth();

  try {
    return await prisma.pet.findMany({
      where: { userId: session.user.id },
    });
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

export const addPet = async (
  pet: unknown,
): Promise<{ message: string } | undefined> => {
  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return { message: 'Invalid pet data.' };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: { id: session.user.id },
        },
      },
    });
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
  // authentication check
  const session = await checkAuth();

  // validation
  const validatedPet = petFormSchema.safeParse(pet);
  const validatedId = petIdSchema.safeParse(id);

  if (!validatedPet.success || !validatedId.success) {
    return { message: 'Invalid pet data.' };
  }

  // authorization check
  const petToEdit = await prisma.pet.findUnique({
    where: { id: validatedId.data },
  });

  if (!petToEdit) {
    return { message: 'Pet not found.' };
  }

  if (petToEdit.userId !== session.user.id) {
    return { message: 'Unauthorized.' };
  }

  // database mutation
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
  // authentication check
  const session = await checkAuth();

  // validate
  const validatedId = petIdSchema.safeParse(id);
  if (!validatedId.success) {
    return { message: 'Invalid pet ID format.' };
  }

  // authorization check
  const pet = await prisma.pet.findUnique({
    where: { id: validatedId.data },
  });

  if (!pet) {
    return { message: 'Pet not found.' };
  }

  if (pet.userId !== session.user.id) {
    return { message: 'Unauthorized.' };
  }

  // database mutation
  try {
    await prisma.pet.delete({
      where: { id: validatedId.data },
    });
  } catch (error) {
    return { message: `Error deleting pet: ${error}` };
  }

  revalidatePath('/app', 'layout');
};
