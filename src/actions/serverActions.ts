'use server';

import { prisma } from '@/lib/db';
// import { revalidatePath } from 'next/cache';
// import { redirect, Redirect } from 'next/navigation';
// import { Pet } from '@/types';

export const addPet = async (formData: FormData) => {
  const data = {
    name: formData.get('name') as string,
    ownerName: formData.get('ownerName') as string,
    imageUrl:
      (formData.get('imageUrl') as string) ||
      ('https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png' as string),
    age: Number(formData.get('age') as string),
    notes: formData.get('notes') as string,
  };

  try {
    await prisma.pet.create({ data });
    // revalidatePath('/app/dashboard');
    // redirect('/app/dashboard');
  } catch (error) {
    console.error('Error adding pet:', error);
    throw error;
  }
};

export const getPets = async () => {
  try {
    const pets = await prisma.pet.findMany();
    return pets;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};
