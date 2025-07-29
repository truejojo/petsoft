'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Pet } from '@/generated/prisma';
import { PetEssentials } from '@/types';

export const getPets = async (): Promise<Pet[]> => {
  try {
    return await prisma.pet.findMany();
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

export const addPet = async (
  data: PetEssentials,
): Promise<{ message: string } | undefined> => {
  try {
    if (!data.name || !data.ownerName || !data.age) {
      return { message: 'Some required fields are missing.' };
    }
    await prisma.pet.create({ data });
  } catch (error) {
    return {
      message: `Error adding pet: ${error}`,
    };
  }

  revalidatePath('/app', 'layout');
};

export const editPet = async (
  data: PetEssentials,
  id: Pet['id'],
): Promise<{ message: string } | undefined> => {
  try {
    await prisma.pet.update({
      where: { id },
      data,
    });
  } catch (error) {
    return {
      message: `Error editing pet: ${error}`,
    };
  }

  revalidatePath('/app', 'layout');
};

export const deletePet = async (
  id: Pet['id'],
): Promise<{ message: string } | undefined> => {
  try {
    await prisma.pet.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting pet:', error);
    return { message: `Error deleting pet: ${error}` };
  }

  revalidatePath('/app', 'layout');
};

export const createData = async (
  formData: FormData,
): Promise<PetEssentials> => {
  try {
    return {
      name: formData.get('name') as string,
      ownerName: formData.get('ownerName') as string,
      imageUrl:
        (formData.get('imageUrl') as string) ||
        'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
      age: Number(formData.get('age') as string),
      notes: formData.get('notes') as string,
    };
  } catch (error) {
    throw new Error(`Here are problems.... error: ${error}`);
  }
};
