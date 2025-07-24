'use server';

import { prisma } from '@/lib/db';
import { Pet } from '@/types';

export const addPet = async (petData: Omit<Pet, 'id'>) => {
  try {
    const newPet = await prisma.pet.create({
      data: petData,
    });
    return newPet;
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
