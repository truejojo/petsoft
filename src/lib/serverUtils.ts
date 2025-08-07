import { redirect } from 'next/navigation';
import { auth } from './auth';
import { Pet, User } from '@/generated/prisma';
import { prisma } from './db';

// User
export const checkAuth = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  return session;
};

export const getUserByEmail = async (email: User['email']) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

// Pet
export const getPetById = async (petId: Pet['id']) => {
  return await prisma.pet.findUnique({
    where: { id: petId },
  });
};

export const getPetByUserId = async (userId: User['id']) => {
  return await prisma.pet.findMany({
    where: { userId },
  });
};
