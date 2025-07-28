'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { PetProps } from '@/types';
import { Pet } from '@/generated/prisma';

export const getPets = async (): Promise<Pet[]> => {
  try {
    const pets = await prisma.pet.findMany();
    return pets;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

export const addPet = async (
  data: Omit<PetProps, 'id'>,
): Promise<{ message: string } | undefined> => {
  const error = await addDataToDB(data);

  revalidatePath('/app', 'layout');
  if (error) return error;
};

export const editPet = async (
  data: Omit<PetProps, 'id'>,
  id: string,
): Promise<{ message: string } | undefined> => {
  const error = await editDataInDB(id, data);

  revalidatePath('/app', 'layout');
  if (error) return error;
};

export const deletePet = async (
  id: string,
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

export const handlePetAction = async (formData: FormData): Promise<void> => {
  const petId = formData.get('id') as string | null;
  const data = await createData(formData);

  if (!data.name || !data.ownerName || !data.age) {
    throw new Error('Some required fields are missing.');
  }

  if (petId) {
    await editDataInDB(petId, data);
    revalidatePath(`/app/${petId}`, 'layout');
  } else {
    await addDataToDB(data);
    revalidatePath('/app', 'layout');
  }
};

export const createData = async (formData: FormData) => {
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

// helper function
const addDataToDB = async (
  data: Omit<PetProps, 'id'>,
): Promise<{ message: string } | undefined> => {
  try {
    await prisma.pet.create({ data });
  } catch (error) {
    return {
      message: `Error adding pet: ${error}`,
    };
  }
};

const editDataInDB = async (
  id: string,
  data: Omit<PetProps, 'id'>,
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
};
