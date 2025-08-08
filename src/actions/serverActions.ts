'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Pet } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/db';
import { signIn } from '@/lib/auth';
import { authSchema, petFormSchema, petIdSchema } from '@/lib/schema';
import { checkAuth, getPetById, getPetByUserId } from '@/lib/serverUtils';

// ---- user actions ----
export const logIn = async (
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    await signIn('credentials', formData);
    redirect('/app/dashboard');
  } catch (error) {
    return { message: `Login failed: ${error}` };
  }
};

export const signUp = async (
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const formDataEntries = Object.fromEntries(formData.entries());
    const validatedFormData = authSchema.safeParse(formDataEntries);
    if (!validatedFormData.success) {
      return { message: 'Invalid form data.' };
    }

    const { email, password } = validatedFormData.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    await signIn('credentials', formData);
    redirect('/app/dashboard');
  } catch (error) {
    return { message: `Signup failed: ${error}` };
  }
};

// --- pet actions ---
export const getPets = async (): Promise<Pet[] | { message: string }> => {
  try {
    const session = await checkAuth();
    return await getPetByUserId(session.user.id);
  } catch (error) {
    return { message: `Error fetching pets: ${error}` };
  }
};

export const addPet = async (pet: unknown): Promise<{ message: string }> => {
  try {
    const session = await checkAuth();

    const validatedPet = petFormSchema.safeParse(pet);
    if (!validatedPet.success) {
      return { message: 'Invalid pet data.' };
    }

    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: { id: session.user.id },
        },
      },
    });
    revalidatePath('/app', 'layout');
    return { message: 'Pet added successfully.' };
  } catch (error) {
    return { message: `Error adding pet: ${error}` };
  }
};

export const editPet = async (
  pet: unknown,
  id: unknown,
): Promise<{ message: string }> => {
  try {
    const session = await checkAuth();

    const validatedPet = petFormSchema.safeParse(pet);
    const validatedId = petIdSchema.safeParse(id);

    if (!validatedPet.success || !validatedId.success) {
      return { message: 'Invalid pet data.' };
    }

    const petToEdit = await getPetById(validatedId.data);

    if (!petToEdit) {
      return { message: 'Pet not found.' };
    }

    if (petToEdit.userId !== session.user.id) {
      return { message: 'Unauthorized.' };
    }

    await prisma.pet.update({
      where: { id: validatedId.data },
      data: validatedPet.data,
    });
    revalidatePath('/app', 'layout');
    return { message: 'Pet updated successfully.' };
  } catch (error) {
    // Fängt ALLE Fehler ab, auch von checkAuth()
    return { message: `Error editing pet: ${error}` };
  }
};

export const deletePet = async (id: unknown): Promise<{ message: string }> => {
  try {
    const session = await checkAuth();

    const validatedId = petIdSchema.safeParse(id);
    if (!validatedId.success) {
      return { message: 'Invalid pet ID format.' };
    }

    const pet = await getPetById(validatedId.data);

    if (!pet) {
      return { message: 'Pet not found.' };
    }

    if (pet.userId !== session.user.id) {
      return { message: 'Unauthorized.' };
    }

    await prisma.pet.delete({
      where: { id: validatedId.data },
    });
    revalidatePath('/app', 'layout');
    return { message: 'Pet deleted successfully.' };
  } catch (error) {
    return { message: `Error deleting pet: ${error}` };
  }
};
