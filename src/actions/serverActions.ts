'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { PetProps } from '@/types';
import { Pet } from '@/generated/prisma';
import { sleep } from '@/lib/utils';

export const getPets = async (): Promise<Pet[]> => {
  try {
    const pets = await prisma.pet.findMany();
    return pets;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

export const addPet = async (formData: FormData): Promise<void> => {
  await sleep(5000);
  const data = createData(formData);

  await addDataToDB(data);
  revalidatePath('/app', 'layout');
};

export const editPet = async (
  id: string,
  formData: FormData,
): Promise<void> => {
  const data = createData(formData);

  await editDataInDB(id, data);
  revalidatePath('/app', 'layout');
};

export const deletePet = async (id: string): Promise<void> => {
  try {
    await prisma.pet.delete({
      where: { id },
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    console.error('Error editing pet:', error);
    throw error;
  }
};

export const handlePetAction = async (formData: FormData): Promise<void> => {
  const petId = formData.get('id') as string | null;
  const data = createData(formData);

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

// helper functions
const createData = (formData: FormData): Omit<PetProps, 'id'> => {
  return {
    name: formData.get('name') as string,
    ownerName: formData.get('ownerName') as string,
    imageUrl:
      (formData.get('imageUrl') as string) ||
      'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
    age: Number(formData.get('age') as string),
    notes: formData.get('notes') as string,
  };
};

const addDataToDB = async (data: Omit<PetProps, 'id'>): Promise<void> => {
  try {
    await prisma.pet.create({ data });
  } catch (error) {
    console.error('Error adding pet:', error);
    throw error;
  }
};

const editDataInDB = async (
  id: string,
  data: Omit<PetProps, 'id'>,
): Promise<void> => {
  try {
    await prisma.pet.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error('Error editing pet:', error);
    throw error;
  }
};
